import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { leadSchema, type Lead } from "@/lib/lead-schema";

// Best-effort, per-instance rate limit: 5 enquiries per IP every 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ code: "RATE_LIMITED", message: "Too many enquiries in a short time. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ code: "BAD_REQUEST", message: "Invalid request." }, { status: 400 });
  }

  // Bot check (Cloudflare Turnstile), only enforced once a secret is configured.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: turnstileSecret, response: token, remoteip: ip }),
    })
      .then((r) => r.json() as Promise<{ success: boolean }>)
      .catch(() => ({ success: false }));
    if (!verify.success) {
      return Response.json({ code: "BOT_CHECK_FAILED", message: "Please complete the verification and try again." }, { status: 400 });
    }
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: accept silently without storing anything.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return Response.json({ ok: true });
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return Response.json({ code: "INVALID", message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    // Never pretend an enquiry was delivered when no storage is configured.
    return Response.json(
      { code: "NOT_CONFIGURED", message: "Lead storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 },
    );
  }

  const { website: _honeypot, ...lead } = parsed.data;
  void _honeypot;
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Durable limit that works across serverless instances: 3 enquiries per email per 10 minutes.
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count } = await supabase.from("leads").select("id", { count: "exact", head: true }).eq("email", lead.email).gte("created_at", since);
  if ((count ?? 0) >= 3) {
    return Response.json({ code: "RATE_LIMITED", message: "We've already received your recent enquiries. We'll be in touch soon." }, { status: 429 });
  }

  const { error } = await supabase.from("leads").insert({
    full_name: lead.fullName,
    company: lead.company || null,
    email: lead.email,
    phone: lead.phone,
    industry: lead.industry,
    service: lead.service,
    budget: lead.budget,
    description: lead.description,
    user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  });

  if (error) {
    console.error("[leads] insert failed:", error.message);
    return Response.json({ code: "STORE_FAILED", message: "We couldn't save your enquiry. Please try again shortly." }, { status: 500 });
  }

  // The lead is already stored, so a failed alert must not fail the request.
  await notify(lead).catch((e) => console.error("[leads] alert failed:", e instanceof Error ? e.message : e));

  return Response.json({ ok: true }, { status: 201 });
}

/** Emails the team about a new enquiry when RESEND_API_KEY and LEAD_ALERT_EMAIL are set. */
async function notify(lead: Omit<Lead, "website">) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return;
  const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const rows: [string, string][] = [
    ["Name", lead.fullName],
    ["Company", lead.company || "—"],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Industry", lead.industry],
    ["Service", lead.service],
    ["Budget", lead.budget],
  ];
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.LEAD_ALERT_FROM ?? "CLANNOVA Website <onboarding@resend.dev>",
    to: to.split(",").map((t) => t.trim()),
    replyTo: lead.email,
    subject: `New enquiry: ${lead.fullName} · ${lead.service}`,
    html: `<h2>New website enquiry</h2><table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table><p><b>Project</b></p><p style="white-space:pre-wrap">${esc(lead.description)}</p>`,
  });
  if (error) throw new Error(error.message);
}
