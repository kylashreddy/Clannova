"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static SVG of the same composition: server render, no-WebGL fallback and loading state. */
function HexFallback({ hidden }: { hidden?: boolean }) {
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      return `${200 + Math.cos(a) * r},${200 + Math.sin(a) * r}`;
    }).join(" ");
  return (
    <svg
      viewBox="0 0 400 400"
      className={`absolute inset-0 m-auto h-[78%] w-[78%] transition-opacity duration-1000 ${hidden ? "opacity-0" : "opacity-100"}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="hf-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#39D5FF" />
          <stop offset="1" stopColor="#9B7BFF" />
        </linearGradient>
        <radialGradient id="hf-glow">
          <stop offset="0" stopColor="#39D5FF" stopOpacity="0.25" />
          <stop offset="1" stopColor="#39D5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#hf-glow)" />
      <polygon points={hex(185)} fill="none" stroke="url(#hf-g)" strokeOpacity="0.25" strokeWidth="1" />
      <polygon points={hex(150)} fill="none" stroke="url(#hf-g)" strokeOpacity="0.45" strokeWidth="1.5" />
      <polygon points={hex(110)} fill="none" stroke="url(#hf-g)" strokeWidth="14" strokeLinejoin="round" />
      <circle cx="200" cy="200" r="34" fill="none" stroke="#9B7BFF" strokeOpacity="0.6" strokeDasharray="4 6" />
    </svg>
  );
}

export function HeroVisual({ ambient }: { ambient?: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer the 3D bundle until the browser is idle so it never blocks first paint.
    const start = () => setMode(hasWebGL() ? "webgl" : "static");
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(start);
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  useEffect(() => {
    if (mode !== "webgl") return;
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, [mode]);

  return (
    <div className={ambient ? "absolute inset-0" : "relative aspect-square w-full"}>
      {!ambient && <HexFallback hidden={mode === "webgl" && ready} />}
      {mode === "webgl" && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene reduceMotion={reduce} ambient={ambient} />
        </div>
      )}
    </div>
  );
}
