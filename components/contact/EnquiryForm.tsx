"use client";

import { Button } from "@/components/ui/Button";
import { areas } from "@/data/areas";
import {
  budgetRanges,
  interestOptions,
  submitEnquiry,
  validateEnquiry,
  type EnquiryPayload,
  type Interest,
} from "@/lib/form";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Children, cloneElement, isValidElement, useState, type ReactElement } from "react";

const empty: EnquiryPayload = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  interest: "",
  preferredLocation: "",
  budget: "",
  message: "",
  consent: false,
};

export function EnquiryForm({
  compact,
  dark,
  propertyTitle,
  propertySlug,
  enquiryPrompt,
  whatsappHref,
}: {
  compact?: boolean;
  dark?: boolean;
  propertyTitle?: string;
  propertySlug?: string;
  enquiryPrompt?: string;
  whatsappHref?: string;
}) {
  const [data, setData] = useState<EnquiryPayload>({
    ...empty,
    preferredLocation: "",
    propertyTitle,
    propertySlug,
    message: enquiryPrompt
      ?? (propertyTitle
        ? `I would like to know more about ${propertyTitle}.`
        : ""),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryPayload, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const field = cn(
    "mt-2 min-h-11 w-full border bg-transparent px-3 py-3 text-base outline-none transition-colors duration-300",
    dark
      ? "border-ivory/20 bg-ink text-ivory placeholder:text-ivory/35 focus:border-brass-soft"
      : "border-ink/15 bg-ivory text-ink placeholder:text-ink/35 focus:border-ink/40",
  );

  const labelClass = cn(
    "block text-[10px] uppercase tracking-[0.16em]",
    dark ? "text-ivory/55" : "text-ink-muted",
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateEnquiry(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please complete the highlighted fields.");
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry({
      ...data,
      propertyTitle,
      propertySlug,
    });
    setStatus(result.ok ? "success" : "error");
    setMessage(result.message);
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "border px-6 py-8",
          dark ? "border-ivory/20 text-ivory" : "border-ink/10 text-ink",
        )}
        role="status"
      >
        <p className="font-serif text-3xl">Thank you.</p>
        <p className="mt-4 text-sm leading-relaxed opacity-80">{message}</p>
        <a
          href={whatsappHref ?? defaultWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-6 inline-flex text-[11px] uppercase tracking-[0.18em]",
            dark ? "text-brass-soft" : "text-brass",
          )}
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {propertyTitle ? (
        <p className={cn("mb-6 text-sm", dark ? "text-ivory/70" : "text-ink-muted")}>
          Regarding <span className="text-inherit">{propertyTitle}</span>
        </p>
      ) : null}

      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        <Field label="First name" htmlFor="firstName" error={errors.firstName} labelClass={labelClass} dark={dark}>
          <input
            id="firstName"
            className={field}
            autoComplete="given-name"
            value={data.firstName}
            onChange={(event) => setData({ ...data, firstName: event.target.value })}
          />
        </Field>
        <Field label="Last name" htmlFor="lastName" error={errors.lastName} labelClass={labelClass} dark={dark}>
          <input
            id="lastName"
            className={field}
            autoComplete="family-name"
            value={data.lastName}
            onChange={(event) => setData({ ...data, lastName: event.target.value })}
          />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone} labelClass={labelClass} dark={dark}>
          <input
            id="phone"
            className={field}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={data.phone}
            onChange={(event) => setData({ ...data, phone: event.target.value })}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email} labelClass={labelClass} dark={dark}>
          <input
            id="email"
            className={field}
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(event) => setData({ ...data, email: event.target.value })}
          />
        </Field>
        <Field
          label="I am interested in"
          htmlFor="interest"
          error={errors.interest}
          labelClass={labelClass} dark={dark}
        >
          <select
            id="interest"
            className={field}
            value={data.interest}
            onChange={(event) =>
              setData({ ...data, interest: event.target.value as Interest | "" })
            }
          >
            <option value="">Please select</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred location" htmlFor="location" labelClass={labelClass} dark={dark}>
          <select
            id="location"
            className={field}
            value={data.preferredLocation}
            onChange={(event) =>
              setData({ ...data, preferredLocation: event.target.value })
            }
          >
            <option value="">Any / not sure</option>
            {areas.map((area) => (
              <option key={area.slug} value={area.name}>
                {area.name}
              </option>
            ))}
            <option value="North Goa">North Goa</option>
            <option value="Central Goa">Central Goa</option>
            <option value="South Goa">South Goa</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Budget range" htmlFor="budget" labelClass={labelClass} dark={dark}>
          <select
            id="budget"
            className={field}
            value={data.budget}
            onChange={(event) => setData({ ...data, budget: event.target.value })}
          >
            <option value="">Please select</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message" htmlFor="message" labelClass={labelClass} dark={dark}>
          <textarea
            id="message"
            className={cn(field, "min-h-28")}
            rows={compact ? 4 : 5}
            value={data.message}
            onChange={(event) => setData({ ...data, message: event.target.value })}
          />
        </Field>
      </div>

      <label className="mt-5 flex min-h-11 items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0"
          checked={data.consent}
          onChange={(event) => setData({ ...data, consent: event.target.checked })}
        />
        <span className={dark ? "text-ivory/70" : "text-ink-muted"}>
          I consent to Pacific Properties Goa contacting me about this enquiry.
          We will not share your details.
        </span>
      </label>
      {errors.consent ? (
        <p className={cn("mt-2 text-xs", dark ? "text-red-300" : "text-red-800")}>
          {errors.consent}
        </p>
      ) : null}

      {status === "error" && message ? (
        <p
          className={cn("mt-4 text-sm", dark ? "text-red-300" : "text-red-800")}
          role="alert"
        >
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        variant={dark ? "primary" : "dark"}
        className="mt-8 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  labelClass,
  dark,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  labelClass: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<Record<string, unknown>>, {
              "aria-invalid": error ? true : undefined,
              "aria-describedby": error ? `${htmlFor}-error` : undefined,
            })
          : child,
      )}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className={cn("mt-1 text-xs", dark ? "text-red-300" : "text-red-800")}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
