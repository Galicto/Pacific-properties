/**
 * Enquiry form adapter.
 *
 * Current behaviour (safe defaults — does NOT pretend to be a live backend):
 * - `mock`: validates, stores the payload in sessionStorage, returns success.
 * - `mailto`: opens a mail draft to the configured address.
 * - `endpoint`: POSTs JSON to NEXT_PUBLIC_FORM_ENDPOINT (Formspree, HubSpot,
 *   a Next.js route, Resend proxy, etc.) when that env var is set.
 *
 * To connect a real backend later:
 * 1. Set NEXT_PUBLIC_FORM_ENDPOINT in `.env.local`
 *    Formspree example: https://formspree.io/f/your-id
 * 2. Optionally set NEXT_PUBLIC_FORM_MODE=endpoint
 * 3. If the provider needs a different shape, adapt `toProviderPayload` below.
 */

import { siteConfig } from "@/lib/config";

export type Interest = "Buy" | "Sell" | "Rent" | "Investment" | "Other";

export type EnquiryPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  interest: Interest | "";
  preferredLocation: string;
  budget: string;
  message: string;
  consent: boolean;
  propertyTitle?: string;
  propertySlug?: string;
};

export type EnquiryResult = {
  ok: boolean;
  mode: "mock" | "mailto" | "endpoint";
  message: string;
};

export const budgetRanges = [
  "Flexible",
  "Under ₹3 Cr",
  "₹3–7 Cr",
  "₹7–12 Cr",
  "₹12–20 Cr",
  "₹20 Cr and above",
  "Available on Request",
] as const;

export const interestOptions: Interest[] = [
  "Buy",
  "Sell",
  "Rent",
  "Investment",
  "Other",
];

const STORAGE_KEY = "pacific-enquiries";

function getMode(): EnquiryResult["mode"] {
  const explicit = process.env.NEXT_PUBLIC_FORM_MODE;
  if (explicit === "mailto" || explicit === "endpoint" || explicit === "mock") {
    return explicit;
  }
  if (process.env.NEXT_PUBLIC_FORM_ENDPOINT) return "endpoint";
  return "mock";
}

function toProviderPayload(data: EnquiryPayload) {
  const subject = data.propertyTitle
    ? `Enquiry — ${data.propertyTitle}`
    : `Enquiry — ${data.interest || "General"}`;

  return {
    ...data,
    subject,
    _subject: subject,
    company: siteConfig.companyName,
  };
}

function mailtoHref(data: EnquiryPayload) {
  const payload = toProviderPayload(data);
  const body = [
    `Name: ${data.firstName} ${data.lastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Interest: ${data.interest}`,
    `Preferred location: ${data.preferredLocation || "—"}`,
    `Budget: ${data.budget || "—"}`,
    data.propertyTitle ? `Property: ${data.propertyTitle}` : null,
    "",
    data.message || "(No additional message)",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
}

export function validateEnquiry(data: EnquiryPayload) {
  const errors: Partial<Record<keyof EnquiryPayload, string>> = {};

  if (!data.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!data.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.interest) errors.interest = "Please tell us what you are considering.";
  if (!data.consent) {
    errors.consent = "Consent is required before we can receive your enquiry.";
  }

  return errors;
}

export async function submitEnquiry(
  data: EnquiryPayload,
): Promise<EnquiryResult> {
  const mode = getMode();

  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]",
      ) as EnquiryPayload[];
      existing.push(data);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      /* storage may be unavailable */
    }
  }

  if (mode === "endpoint") {
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      return {
        ok: false,
        mode,
        message:
          "A form endpoint is configured as the mode, but NEXT_PUBLIC_FORM_ENDPOINT is missing.",
      };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toProviderPayload(data)),
    });

    if (!response.ok) {
      return {
        ok: false,
        mode,
        message:
          "We could not reach the enquiry service. Please write to us on WhatsApp instead.",
      };
    }

    return {
      ok: true,
      mode,
      message:
        "Thank you. Your enquiry has been sent. We will be in touch shortly.",
    };
  }

  if (mode === "mailto") {
    if (typeof window !== "undefined") {
      window.location.href = mailtoHref(data);
    }
    return {
      ok: true,
      mode,
      message:
        "A mail draft has been opened. If it did not appear, please write to us on WhatsApp.",
    };
  }

  return {
    ok: true,
    mode: "mock",
    message:
      "Thank you. Your enquiry has been received. For the quickest reply, continue with us on WhatsApp.",
  };
}
