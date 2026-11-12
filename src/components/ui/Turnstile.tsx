"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/** Cloudflare Turnstile bot check. Renders nothing until a site key is configured. */
export function Turnstile({ onToken, resetSignal }: { onToken: (token: string) => void; resetSignal: number }) {
  const el = useRef<HTMLDivElement>(null);
  const id = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const cb = useRef(onToken);
  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!turnstileSiteKey || !el.current || !(loaded || window.turnstile) || id.current) return;
    id.current = window.turnstile!.render(el.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      callback: (t: string) => cb.current(t),
      "expired-callback": () => cb.current(""),
      "error-callback": () => cb.current(""),
    });
    return () => {
      if (id.current) window.turnstile?.remove(id.current);
      id.current = null;
    };
  }, [loaded]);

  useEffect(() => {
    if (resetSignal && id.current) window.turnstile?.reset(id.current);
  }, [resetSignal]);

  if (!turnstileSiteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onLoad={() => setLoaded(true)} />
      <div ref={el} className="min-h-[65px]" />
    </>
  );
}
