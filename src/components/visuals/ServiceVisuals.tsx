// Lightweight HTML/CSS illustrations, one per service division. They are
// decorative demonstrations, so they are hidden from assistive technology.

import { Bot, Check, MapPin, Star, TriangleAlert } from "lucide-react";
import type { ServiceId } from "@/lib/content";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl border border-line bg-space/80">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-steel/30" />
        <span className="size-2.5 rounded-full bg-steel/30" />
        <span className="size-2.5 rounded-full bg-steel/30" />
        <span className="ml-3 truncate font-mono text-[10px] tracking-wider text-steel">{label}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function WebVisual() {
  return (
    <Frame label="yourbusiness.com">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-16 rounded bg-ice/70" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2 w-8 rounded bg-steel/30" />
            ))}
            <div className="h-2 w-10 rounded bg-cyan" />
          </div>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-3 pt-3">
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-ice/80" />
            <div className="h-4 w-4/5 rounded bg-ice/80" />
            <div className="h-2 w-full rounded bg-steel/30" />
            <div className="h-2 w-3/4 rounded bg-steel/30" />
            <div className="mt-3 h-6 w-24 rounded-full bg-cyan" />
          </div>
          <div className="rounded-xl bg-[linear-gradient(135deg,rgb(57_213_255/0.35),rgb(155_123_255/0.35))]" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1.5 rounded-lg border border-line p-2.5" style={{ animation: `float-y 5s ease-in-out ${i * 0.4}s infinite` }}>
              <div className="h-8 rounded bg-slate" />
              <div className="h-1.5 w-3/4 rounded bg-steel/40" />
              <div className="h-1.5 w-1/2 rounded bg-steel/25" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-steel">
          <span className="size-1.5 rounded-full bg-cyan" /> Responsive · Accessible · Search-ready
        </div>
      </div>
    </Frame>
  );
}

function AiVisual() {
  return (
    <Frame label="whatsapp · ai assistant">
      <div className="space-y-3 text-[13px] leading-snug">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate px-3.5 py-2.5 text-ice">Hi! Do you have a table for 4 tonight?</div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-violet/30 bg-violet/15 px-3.5 py-2.5 text-ice">
          <span className="mb-1 flex items-center gap-1.5 font-mono text-[10px] text-violet">
            <Bot className="size-3" /> AI assistant
          </span>
          Yes, we have 7:30 PM or 8:15 PM available. Shall I book one for you?
        </div>
        <div className="max-w-[60%] rounded-2xl rounded-tl-sm bg-slate px-3.5 py-2.5 text-ice">7:30 please</div>
        <div className="flex items-center gap-1 pl-1 text-steel">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-violet" style={{ animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
        <ol className="mt-2 space-y-1.5 border-t border-line pt-3 font-mono text-[10px] text-steel">
          {["Booking created · 7:30 PM · 4 guests", "Confirmation sent on WhatsApp", "Reminder scheduled · 6:30 PM"].map((s) => (
            <li key={s} className="flex items-center gap-2">
              <Check className="size-3 text-cyan" /> {s}
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function SoftwareVisual() {
  const rows = [
    { item: "Basmati Rice 25kg", stock: 82, unit: "164 bags" },
    { item: "Sunflower Oil 15L", stock: 46, unit: "58 tins" },
    { item: "Toor Dal 30kg", stock: 14, unit: "9 bags", low: true },
    { item: "Atta 10kg", stock: 64, unit: "120 bags" },
  ];
  return (
    <Frame label="operations · inventory">
      <div className="mb-4 grid grid-cols-3 gap-2">
        {["Warehouse A", "Warehouse B", "In transit"].map((l, i) => (
          <div key={l} className="rounded-lg border border-line p-2.5">
            <div className="font-mono text-[9px] uppercase tracking-wider text-steel">{l}</div>
            <div className="mt-2 flex h-6 items-end gap-0.5">
              {[5, 8, 6, 9, 7, 10].map((h, j) => (
                <span
                  key={j}
                  className="w-full origin-bottom rounded-sm bg-gradient-to-t from-cyan/60 to-violet/60"
                  style={{ height: `${(h - i) * 10}%`, animation: `rise 1.2s ${j * 0.08}s both cubic-bezier(.16,1,.3,1)` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="space-y-2.5 text-[12px]">
        {rows.map((r) => (
          <li key={r.item} className="grid grid-cols-[1fr_80px_64px] items-center gap-3">
            <span className="truncate text-ice">{r.item}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-slate">
              <span className={`block h-full rounded-full ${r.low ? "bg-[#ffb454]" : "bg-cyan"}`} style={{ width: `${r.stock}%` }} />
            </span>
            <span className="text-right font-mono text-[10px] text-steel">{r.unit}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#ffb454]/30 bg-[#ffb454]/10 px-3 py-2 text-[11px] text-[#ffd59a]">
        <TriangleAlert className="size-3.5" /> Toor Dal below reorder level: purchase order drafted
      </div>
    </Frame>
  );
}

function GrowthVisual() {
  return (
    <Frame label="local search">
      <div className="rounded-full border border-line px-4 py-2 text-[12px] text-steel">dental clinic near me</div>
      <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/[0.05] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-sm font-semibold text-ice">Your Clinic Name</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-steel">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3 fill-cyan text-cyan" />
              ))}
              <span className="ml-1">Reviews · Dentist</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-[11px] text-steel">
              <MapPin className="size-3" /> Open now · Closes 8 PM
            </div>
          </div>
          <div className="size-14 shrink-0 rounded-lg bg-[linear-gradient(135deg,rgb(57_213_255/0.4),rgb(155_123_255/0.4))]" />
        </div>
        <div className="mt-3 flex gap-2">
          {["Book", "Call", "Directions"].map((b, i) => (
            <span key={b} className={`rounded-full px-3 py-1 text-[11px] ${i === 0 ? "bg-cyan text-space" : "border border-line text-ice"}`}>
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between font-mono text-[9px] uppercase tracking-wider text-steel">
          <span>Visibility trend</span>
          <span className="text-cyan">Illustrative</span>
        </div>
        <svg viewBox="0 0 200 48" className="h-12 w-full">
          <defs>
            <linearGradient id="gv" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#39D5FF" stopOpacity="0.35" />
              <stop offset="1" stopColor="#39D5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 42 L25 38 L50 40 L75 30 L100 32 L125 22 L150 18 L175 12 L200 6 L200 48 L0 48Z" fill="url(#gv)" />
          <path d="M0 42 L25 38 L50 40 L75 30 L100 32 L125 22 L150 18 L175 12 L200 6" fill="none" stroke="#39D5FF" strokeWidth="1.5" />
        </svg>
      </div>
    </Frame>
  );
}

export function ServiceVisual({ id }: { id: ServiceId }) {
  switch (id) {
    case "web":
      return <WebVisual />;
    case "ai":
      return <AiVisual />;
    case "software":
      return <SoftwareVisual />;
    case "growth":
      return <GrowthVisual />;
  }
}
