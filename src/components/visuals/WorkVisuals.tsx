// Decorative UI compositions for the concept demonstrations.

import { Bot, Check, Clock, Search, ShoppingBag } from "lucide-react";
import type { WorkProject } from "@/lib/content";

const Bar = ({ w, c = "bg-steel/30" }: { w: string; c?: string }) => <span className={`block h-1.5 rounded ${c}`} style={{ width: w }} />;

function Commerce() {
  const products = ["from-cyan/40 to-violet/30", "from-violet/40 to-cyan/20", "from-cyan/30 to-slate", "from-violet/30 to-slate"];
  return (
    <div className="flex h-full flex-col gap-4 p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold tracking-[0.3em] text-ice">LUMEN</span>
        <div className="flex items-center gap-3 text-steel">
          <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] sm:flex">
            <Search className="size-3" /> Search linen, cotton…
          </span>
          <ShoppingBag className="size-4" />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
        {products.map((g, i) => (
          <div key={i} className="flex flex-col gap-2 transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>
            <div className={`min-h-24 flex-1 rounded-xl bg-gradient-to-br ${g}`} />
            <Bar w="80%" c="bg-ice/60" />
            <Bar w="40%" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl border border-line bg-space/60 px-4 py-3 text-[11px]">
        <span className="text-steel">UPI · Cards · Net banking</span>
        <span className="rounded-full bg-cyan px-3 py-1 font-semibold text-space">Checkout</span>
      </div>
    </div>
  );
}

function Restaurant() {
  const orders = [
    { t: "Table 4", s: "Preparing", c: "text-cyan" },
    { t: "Pickup #212", s: "Ready", c: "text-[#7cf0b5]" },
    { t: "Table 9", s: "New", c: "text-violet" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Kitchen display</p>
      {orders.map((o) => (
        <div key={o.t} className="flex items-center justify-between rounded-xl border border-line bg-space/60 px-4 py-3">
          <div className="space-y-1.5">
            <span className="block text-sm text-ice">{o.t}</span>
            <Bar w="72px" />
          </div>
          <span className={`font-mono text-[10px] ${o.c}`}>{o.s}</span>
        </div>
      ))}
    </div>
  );
}

function Assistant() {
  return (
    <div className="flex h-full flex-col justify-end gap-2.5 p-5 text-[12px]">
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate px-3 py-2 text-ice">What&apos;s your refund policy?</div>
      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-violet/30 bg-violet/15 px-3 py-2 text-ice">
        <span className="mb-1 flex items-center gap-1 font-mono text-[9px] text-violet">
          <Bot className="size-3" /> Atlas · from Help Centre
        </span>
        Refunds are processed within 5 working days of pickup…
      </div>
      <div className="ml-auto rounded-full border border-line px-3 py-1 font-mono text-[9px] text-steel">Hand off to a human →</div>
    </div>
  );
}

function Dashboard() {
  const bars = [40, 62, 48, 75, 58, 88, 70];
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="grid grid-cols-3 gap-2">
        {["Revenue", "Orders", "Invoices due"].map((k) => (
          <div key={k} className="rounded-lg border border-line p-2.5">
            <span className="font-mono text-[9px] uppercase text-steel">{k}</span>
            <span className="mt-2 block h-2.5 w-3/4 rounded bg-ice/60" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-2 rounded-lg border border-line p-3">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-cyan/70 to-violet/70 transition-transform duration-700 group-hover:scale-y-110"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Booking() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[10px] text-steel">
        {days.map((d, i) => (
          <span key={d} className={`rounded-lg border py-2 ${i === 2 ? "border-cyan/60 bg-cyan/10 text-ice" : "border-line"}`}>
            {d}
          </span>
        ))}
      </div>
      {["10:00", "11:30", "15:00"].map((t, i) => (
        <div key={t} className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-[12px] ${i === 1 ? "border-cyan/60 text-ice" : "border-line text-steel"}`}>
          <span className="flex items-center gap-2">
            <Clock className="size-3.5" /> {t}
          </span>
          {i === 1 ? <Check className="size-3.5 text-cyan" /> : <span className="font-mono text-[9px]">Open</span>}
        </div>
      ))}
    </div>
  );
}

export function WorkVisual({ kind }: { kind: WorkProject["visual"] }) {
  const map = { commerce: Commerce, restaurant: Restaurant, assistant: Assistant, dashboard: Dashboard, booking: Booking };
  const C = map[kind];
  return (
    <div aria-hidden className="h-full">
      <C />
    </div>
  );
}
