"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./meta-pixel.css";
import IntelligenceTracking from "./intelligence-tracking";

const PIXEL_ID = "1714519746738518";
const CONSENT_KEY = "eduverso-marketing-consent-v1";

type Preference = "loading" | "enabled" | "disabled";
type FacebookPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  push?: FacebookPixel;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}

function installPixel() {
  if (window.fbq) return;
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  }) as FacebookPixel;

  fbq.push = fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", PIXEL_ID);
}

// In-memory choice also works when an in-app browser blocks localStorage.
let marketingAllowed = false;
function isMarketingEnabled() {
  return marketingAllowed;
}

/**
 * Called only from the offer cards on the public landing page.
 * Never send names, emails, study topics, account data, or health information.
 * A checkout click is NOT InitiateCheckout or Purchase. Kiwify owns those events.
 */
export function trackEduversoCheckout(
  event: MouseEvent<HTMLAnchorElement>,
  details: { productId: string; productName: string; value: number; checkoutUrl: string },
) {
  if (!isMarketingEnabled() || !window.fbq) return;
  window.fbq("trackCustom", "CheckoutClick", {
    content_name: details.productName,
    content_ids: [details.productId],
    content_type: "product",
    currency: "BRL",
    value: details.value,
    num_items: 1,
  });

  // Give the browser a brief opportunity to dispatch the event before leaving
  // for the Kiwify checkout. Respect open-in-new-tab and modified clicks.
  if (event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  window.setTimeout(() => window.location.assign(details.checkoutUrl), 180);
}

/** Public landing only: operational load count and Meta events. Preserve explicit opt-outs. */
export default function MetaPixelTracking() {
  const [preference, setPreference] = useState<Preference>("loading");
  const pageViewSent = useRef(false);
  const offerViewSent = useRef(false);
  const loadCountSent = useRef(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      marketingAllowed = saved !== "declined";
      setPreference(marketingAllowed ? "enabled" : "disabled");
    } catch {
      marketingAllowed = true;
      setPreference("enabled");
    }
  }, []);

  // A visible, hydrated landing page is counted once per mount.
  // No identifiers, URL parameters, referrer, cookies or campaign data are sent.
  useEffect(() => {
    function countVisibleLoad() {
      if (loadCountSent.current || document.visibilityState !== "visible") return;
      loadCountSent.current = true;
      void fetch("/api/landing-view", {
        method: "POST",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        cache: "no-store",
        keepalive: true,
      }).catch(() => { /* Never interfere with navigation. */ });
    }
    countVisibleLoad();
    document.addEventListener("visibilitychange", countVisibleLoad);
    return () => document.removeEventListener("visibilitychange", countVisibleLoad);
  }, []);

  useEffect(() => {
    if (preference === "enabled") {
      installPixel();
      window.fbq?.("consent", "grant");
      if (!pageViewSent.current) {
        window.fbq?.("track", "PageView");
        pageViewSent.current = true;
      }
    } else if (preference === "disabled") {
      window.fbq?.("consent", "revoke");
    }
  }, [preference]);

  // Measure the offer only when its heading becomes visible, not just on page load.
  useEffect(() => {
    if (preference !== "enabled" || offerViewSent.current) return;
    const heading = document.getElementById("lp-pricing-title");
    if (!heading || typeof IntersectionObserver === "undefined") return;
    let inView = false;
    function sendOfferView() {
      if (!inView || document.visibilityState !== "visible" ||
          !isMarketingEnabled() || !window.fbq || offerViewSent.current) return;
      offerViewSent.current = true;
      window.fbq("track", "ViewContent", { content_name: "Eduverso - Planos", content_category: "Oferta" });
      observer.disconnect();
    }
    const observer = new IntersectionObserver((entries) => {
      inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5);
      sendOfferView();
    }, { threshold: 0.5 });
    observer.observe(heading);
    document.addEventListener("visibilitychange", sendOfferView);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sendOfferView);
    };
  }, [preference]);

  function decide(next: "accepted" | "declined") {
    marketingAllowed = next === "accepted";
    if (!marketingAllowed) window.fbq?.("consent", "revoke");
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // If storage is disabled, keep the user's choice for this page view.
    }
    setPreference(marketingAllowed ? "enabled" : "disabled");
  }

  return (
    <details className="eduverso-privacy-settings">
      <summary>Preferências de privacidade</summary>
      <div className="eduverso-privacy-panel">
      <p>Gerencie a medição opcional de navegação e anúncios. Suas escolhas não afetam o acesso ou a compra.</p>
      <IntelligenceTracking />
    {preference !== "loading" && <button
      type="button"
      className="eduverso-privacy-choice"
      onClick={() => decide(preference === "enabled" ? "declined" : "accepted")}
      aria-label={preference === "enabled" ? "Desativar medição de anúncios da Meta" : "Ativar medição de anúncios da Meta"}
    >
      {preference === "enabled" ? "Desativar medição de anúncios" : "Ativar medição de anúncios"}
    </button>}
      </div>
    </details>
  );
}
