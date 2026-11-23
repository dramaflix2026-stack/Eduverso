"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./meta-pixel.css";

const PIXEL_ID = "1714519746738518";
const CONSENT_KEY = "eduverso-marketing-consent-v1";

type Consent = "loading" | "unset" | "accepted" | "declined";
type FacebookPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
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

function hasMarketingConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

/**
 * Called only from the offer cards on the public landing page.
 * Never send names, emails, study topics, account data, or health information.
 * A checkout click is NOT a Purchase conversion.
 */
export function trackEduversoCheckout(
  event: MouseEvent<HTMLAnchorElement>,
  details: { productId: string; productName: string; value: number; checkoutUrl: string },
) {
  if (!hasMarketingConsent() || !window.fbq) return;
  window.fbq("track", "InitiateCheckout", {
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

/** Marketing-only tracking: mounted on the public home page, not the study area or auth. */
export default function MetaPixelTracking() {
  const [consent, setConsent] = useState<Consent>("loading");
  const pageViewSent = useRef(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      setConsent(saved === "accepted" ? "accepted" : saved === "declined" ? "declined" : "unset");
    } catch {
      setConsent("unset");
    }
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      installPixel();
      window.fbq?.("consent", "grant");
      if (!pageViewSent.current) {
        window.fbq?.("track", "PageView");
        pageViewSent.current = true;
      }
    } else if (consent === "declined") {
      window.fbq?.("consent", "revoke");
    }
  }, [consent]);

  function decide(next: "accepted" | "declined") {
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // If storage is disabled, keep the user's choice for this page view.
    }
    setConsent(next);
  }

  if (consent === "loading") return null;

  if (consent !== "unset") {
    return (
      <button
        type="button"
        className="eduverso-cookies-settings"
        onClick={() => setConsent("unset")}
        aria-label="Alterar preferências de cookies de anúncios"
      >
        Cookies
      </button>
    );
  }

  return (
    <section className="eduverso-cookies-banner" aria-label="Preferências de cookies de anúncios">
      <div className="eduverso-cookies-text">
        <strong>Cookies de anúncios</strong>
        <p>Podemos usar o Pixel da Meta para medir visitas e cliques nas ofertas. Você escolhe se permite esse rastreamento; a navegação funciona normalmente se recusar.</p>
      </div>
      <div className="eduverso-cookies-actions">
        <button type="button" onClick={() => decide("declined")} className="eduverso-cookies-decline">Recusar</button>
        <button type="button" onClick={() => decide("accepted")} className="eduverso-cookies-accept">Aceitar</button>
      </div>
    </section>
  );
}
