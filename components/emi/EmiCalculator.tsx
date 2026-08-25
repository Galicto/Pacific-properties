"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { IconChevronDown, IconClose, IconReset } from "@/components/ui/Icons";
import { usePrefersReducedMotion } from "@/lib/hooks";
import {
  amortisationSchedule,
  derivedLoanAmount,
  downPaymentPercent,
  emiDefaults,
  emiStateToQuery,
  estimateEmi,
  financingWhatsAppText,
  formatInrCompact,
  formatInrExact,
  formatInrGrouped,
  parseInrInput,
  persistEmiState,
  roundRupee,
  validateEmiInput,
  type AmortisationRow,
  type EmiMode,
  type EmiPersistedState,
  defaultStateFromPrice,
} from "@/lib/emi";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const PAGE_SIZE = 12;
const CIRC = Number((2 * Math.PI * 52).toFixed(2));

type DragBind = {
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
};

export function EmiCalculator({
  propertyPrice,
  propertyTitle,
  propertySlug,
  propertyLocation,
}: {
  propertyPrice?: number | null;
  propertyTitle?: string;
  propertySlug?: string;
  propertyLocation?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const router = useRouter();
  const baseId = useId();
  const dragging = useRef(false);
  const persistTimer = useRef(0);
  const [state, setState] = useState<EmiPersistedState>(() =>
    defaultStateFromPrice(propertyPrice, {
      propertySlug,
      propertyTitle,
      propertyLocation,
    }),
  );
  const [advanced, setAdvanced] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [schedulePage, setSchedulePage] = useState(0);

  const loanAmount = derivedLoanAmount(state);
  const estimate = useMemo(
    () =>
      estimateEmi({
        principal: loanAmount,
        annualRatePercent: state.annualRatePercent,
        tenureYears: state.tenureYears,
        tenureMonths: state.tenureMonths,
        processingFeePercent: state.processingFeePercent,
        processingFeeFixed: state.processingFeeFixed,
        prepayment: state.prepayment,
        downPayment: state.downPayment,
      }),
    [loanAmount, state],
  );

  const errors = useMemo(
    () =>
      validateEmiInput({
        principal: loanAmount,
        annualRatePercent: state.annualRatePercent,
        tenureYears: state.tenureYears,
        tenureMonths: state.tenureMonths,
        downPayment: state.downPayment,
        mode: state.mode,
        propertyPrice: state.propertyPrice,
      }),
    [loanAmount, state],
  );
  const valid = Object.keys(errors).length === 0;

  const persist = useCallback(
    (next: EmiPersistedState, immediate = false) => {
      window.clearTimeout(persistTimer.current);
      const write = () => {
        persistEmiState(next);
        const params = emiStateToQuery(next);
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}?${params.toString()}`,
        );
      };
      if (immediate || !dragging.current) {
        persistTimer.current = window.setTimeout(write, immediate ? 0 : 280);
      }
    },
    [],
  );

  useEffect(() => {
    persist({ ...state, loanAmount });
    return () => window.clearTimeout(persistTimer.current);
  }, [state, loanAmount, persist]);

  const update = useCallback((partial: Partial<EmiPersistedState>) => {
    setState((current) => ({ ...current, ...partial }));
  }, []);

  const setMode = (mode: EmiMode) => {
    if (mode === "price" && state.propertyPrice <= 0 && propertyPrice) {
      update({
        mode,
        propertyPrice,
        downPayment: roundRupee(
          (propertyPrice * emiDefaults.defaultDownPaymentPercent) / 100,
        ),
        loanLocked: false,
      });
      return;
    }
    update({ mode, loanLocked: mode === "loan" });
  };

  const reset = () => {
    setState(
      defaultStateFromPrice(propertyPrice, {
        propertySlug,
        propertyTitle,
        propertyLocation,
      }),
    );
    setScheduleOpen(false);
    setAdvanced(false);
  };

  const clearProperty = () => {
    setState(defaultStateFromPrice(null));
    setScheduleOpen(false);
    router.replace("/emi-calculator");
  };

  const schedule = useMemo(
    () =>
      scheduleOpen && valid
        ? amortisationSchedule({
            principal: loanAmount,
            annualRatePercent: state.annualRatePercent,
            tenureYears: state.tenureYears,
            tenureMonths: state.tenureMonths,
            prepayment: state.prepayment,
          })
        : [],
    [scheduleOpen, valid, loanAmount, state],
  );

  const pages = Math.max(1, Math.ceil(schedule.length / PAGE_SIZE));
  const pageRows = schedule.slice(
    schedulePage * PAGE_SIZE,
    schedulePage * PAGE_SIZE + PAGE_SIZE,
  );

  const whatsapp = buildWhatsAppUrl(
    financingWhatsAppText({
      propertyTitle,
      area: propertyLocation,
      loanAmount: estimate.principal,
      emi: estimate.emi,
      rate: state.annualRatePercent,
      tenureYears: state.tenureYears,
    }),
  );

  const percent = downPaymentPercent(state.propertyPrice, state.downPayment);
  const hasProperty = Boolean(propertyTitle || propertyLocation);
  const priceOnRequest =
    hasProperty && !(typeof propertyPrice === "number" && propertyPrice > 0);

  const openSchedule = () => {
    setScheduleOpen(true);
    setSchedulePage(0);
    window.requestAnimationFrame(() => {
      document.getElementById("repayment-schedule")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const dragBind = {
    onPointerDown: () => {
      dragging.current = true;
    },
    onPointerUp: () => {
      dragging.current = false;
      persist({ ...state, loanAmount }, true);
    },
    onPointerCancel: () => {
      dragging.current = false;
      persist({ ...state, loanAmount }, true);
    },
  };

  return (
    <div className="emi-print w-full min-w-0 max-w-full overflow-x-clip">
      {hasProperty ? (
        <div className="mb-6 flex flex-col gap-3 border border-ink/10 bg-ivory-deep/60 px-4 py-3 text-sm text-ink-muted sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="min-w-0 break-words">
            Calculating for{" "}
            <span className="text-ink">
              {propertyTitle}
              {propertyLocation ? ` · ${propertyLocation}` : ""}
            </span>
          </p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink"
            onClick={clearProperty}
          >
            <IconClose className="h-3.5 w-3.5" />
            Clear property
          </button>
        </div>
      ) : null}

      {priceOnRequest ? (
        <p className="mb-8 text-sm text-ink-muted">
          Price on request — enter a figure that matches your brief. The result
          is an indicative estimate, not a quote.
        </p>
      ) : null}

      <div className="flex min-w-0 flex-col items-stretch gap-8 overflow-x-clip lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <aside className="order-1 min-w-0 w-full lg:order-2 lg:col-span-6">
          <ResultCard
            estimate={estimate}
            valid={valid}
            rate={state.annualRatePercent}
            years={state.tenureYears}
            whatsapp={whatsapp}
            onOpenSchedule={openSchedule}
          />
        </aside>

        <div className="order-2 min-w-0 w-full lg:order-1 lg:col-span-6">
          <section className="border border-ink/10 bg-ivory px-6 py-8 shadow-[0_12px_40px_rgba(23,23,21,0.05)] sm:px-8 sm:py-8">
            <h2 className="font-serif text-[clamp(1.55rem,5vw,1.85rem)] leading-tight tracking-tight">
              Your Finance Plan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Adjust the details below to see your indicative monthly
              commitment.
            </p>

            <div
              className="mt-8 grid grid-cols-2 border border-ink/15 p-1"
              role="tablist"
              aria-label="Calculation mode"
            >
              <ModeTab
                active={state.mode === "price"}
                onClick={() => setMode("price")}
              >
                Property Price
              </ModeTab>
              <ModeTab
                active={state.mode === "loan"}
                onClick={() => setMode("loan")}
              >
                Loan Amount
              </ModeTab>
            </div>

            <div className="mt-8 space-y-8">
              {state.mode === "price" ? (
                <>
                  <MoneyField
                    id={`${baseId}-price`}
                    label="Property price"
                    value={state.propertyPrice}
                    min={emiDefaults.minPropertyPrice}
                    max={emiDefaults.maxPropertyPrice}
                    step={100_000}
                    error={errors.propertyPrice}
                    dragBind={dragBind}
                    onChange={(value) =>
                      update({
                        propertyPrice: value,
                        loanLocked: false,
                        downPayment: roundRupee(
                          (value * emiDefaults.defaultDownPaymentPercent) / 100,
                        ),
                      })
                    }
                  />
                  <div className="grid gap-8 sm:grid-cols-2">
                    <MoneyField
                      id={`${baseId}-down`}
                      label="Down payment"
                      value={state.downPayment}
                      min={0}
                      max={
                        Math.max(state.propertyPrice, 0) ||
                        emiDefaults.maxPropertyPrice
                      }
                      step={50_000}
                      error={errors.downPayment}
                      dragBind={dragBind}
                      onChange={(value) =>
                        update({ downPayment: value, loanLocked: false })
                      }
                    />
                    <NumberField
                      id={`${baseId}-down-pct`}
                      label="Percentage"
                      suffix="%"
                      value={percent}
                      min={0}
                      max={90}
                      step={1}
                      digits={1}
                      dragBind={dragBind}
                      onChange={(value) =>
                        update({
                          downPayment: roundRupee(
                            (state.propertyPrice * value) / 100,
                          ),
                          loanLocked: false,
                        })
                      }
                    />
                  </div>
                  <MoneyField
                    id={`${baseId}-loan`}
                    label="Loan amount"
                    hint="Updates from price minus down payment. Edit to set it independently."
                    value={loanAmount}
                    min={emiDefaults.minLoanAmount}
                    max={
                      state.propertyPrice > 0
                        ? state.propertyPrice
                        : emiDefaults.maxLoanAmount
                    }
                    step={50_000}
                    error={errors.principal}
                    dragBind={dragBind}
                    onChange={(value) =>
                      update({ loanAmount: value, loanLocked: true })
                    }
                  />
                </>
              ) : (
                <MoneyField
                  id={`${baseId}-loan-direct`}
                  label="Loan amount"
                  value={loanAmount}
                  min={emiDefaults.minLoanAmount}
                  max={emiDefaults.maxLoanAmount}
                  step={50_000}
                  error={errors.principal}
                  dragBind={dragBind}
                  onChange={(value) =>
                    update({ loanAmount: value, loanLocked: true })
                  }
                />
              )}

              <div className="grid gap-8 sm:grid-cols-2">
                <NumberField
                  id={`${baseId}-rate`}
                  label="Interest rate"
                  suffix="%"
                  value={state.annualRatePercent}
                  min={emiDefaults.minRate}
                  max={emiDefaults.maxRate}
                  step={0.05}
                  digits={2}
                  error={errors.annualRatePercent}
                  dragBind={dragBind}
                  onChange={(value) => update({ annualRatePercent: value })}
                />
                <NumberField
                  id={`${baseId}-years`}
                  label="Loan tenure"
                  suffix="Years"
                  value={state.tenureYears}
                  min={emiDefaults.minTenureYears}
                  max={emiDefaults.maxTenureYears}
                  step={1}
                  error={errors.tenure}
                  dragBind={dragBind}
                  onChange={(value) => update({ tenureYears: value })}
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-8 flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted"
              aria-expanded={advanced}
              onClick={() => setAdvanced((value) => !value)}
            >
              Advanced settings
              <IconChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  advanced && "rotate-180",
                )}
              />
            </button>

            {advanced ? (
              <div className="mt-5 grid gap-8 border border-ink/10 bg-ivory-deep/50 p-5 sm:grid-cols-2">
                <NumberField
                  id={`${baseId}-fee`}
                  label="Processing fee"
                  suffix="%"
                  value={state.processingFeePercent}
                  min={0}
                  max={3}
                  step={0.1}
                  digits={2}
                  dragBind={dragBind}
                  onChange={(value) => update({ processingFeePercent: value })}
                />
                <MoneyField
                  id={`${baseId}-prepay`}
                  label="Prepayment amount"
                  value={state.prepayment}
                  min={0}
                  max={loanAmount}
                  step={50_000}
                  dragBind={dragBind}
                  onChange={(value) => update({ prepayment: value })}
                />
              </div>
            ) : null}

            <div className="emi-no-print mt-8">
              <Button variant="ghostInk" onClick={reset} className="min-h-11 px-5">
                <IconReset className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </section>
        </div>
      </div>

      <section
        id="repayment-schedule"
        className="emi-no-print mt-12 scroll-mt-28 border-t border-ink/10 pt-8"
      >
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between text-left"
          aria-expanded={scheduleOpen}
          onClick={() => {
            setScheduleOpen((value) => !value);
            setSchedulePage(0);
          }}
        >
          <span className="min-w-0 flex-1 pr-3 font-serif text-[clamp(1.25rem,5.6vw,1.5rem)] leading-tight sm:text-2xl">
            View full repayment schedule
          </span>
          <IconChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              scheduleOpen && "rotate-180",
            )}
          />
        </button>
        {scheduleOpen ? (
          <ScheduleTable
            rows={pageRows}
            page={schedulePage}
            pages={pages}
            total={schedule.length}
            estimate={estimate}
            onPage={setSchedulePage}
          />
        ) : null}
      </section>
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "min-h-11 min-w-0 px-1 text-[9px] uppercase leading-tight tracking-[0.08em] sm:px-3 sm:text-[11px] sm:tracking-[0.16em] transition-colors duration-300",
        active ? "bg-ink text-ivory" : "bg-transparent text-ink/70 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function ResultCard({
  estimate,
  valid,
  rate,
  years,
  whatsapp,
  onOpenSchedule,
}: {
  estimate: ReturnType<typeof estimateEmi>;
  valid: boolean;
  rate: number;
  years: number;
  whatsapp: string;
  onOpenSchedule: () => void;
}) {
  const total = Math.max(estimate.totalPayment, 1);
  const principalPct = Math.round((estimate.principal / total) * 1000) / 10;
  const interestPct = Math.round((100 - principalPct) * 10) / 10;
  const principalDash = Number(((principalPct / 100) * CIRC).toFixed(2));
  const interestDash = Number(((interestPct / 100) * CIRC).toFixed(2));

  return (
    <aside className="emi-result box-border w-full min-w-0 max-w-full overflow-hidden border border-ink/10 bg-ink text-ivory">
      <div className="h-px bg-brass-soft/80" />
      <div className="box-border px-7 py-9 sm:px-8 sm:py-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-brass-soft sm:tracking-[0.22em]">
          Estimated monthly EMI
        </p>
        <p
          className="mt-4 break-words font-serif text-[clamp(2.15rem,11vw,3.15rem)] leading-[1.05] tabular-nums"
          aria-live="polite"
        >
          {valid ? formatInrExact(estimate.emi) : "—"}
        </p>
        <p className="mt-5 break-words text-sm leading-relaxed text-ivory/65">
          Based on {formatInrExact(estimate.principal)} over {years} year
          {years === 1 ? "" : "s"} at {rate.toFixed(2)}% p.a.
        </p>

        <div className="mt-8 hidden flex-wrap items-center gap-5 sm:flex">
          <svg
            viewBox="0 0 140 140"
            className="h-28 w-28 shrink-0 sm:h-[156px] sm:w-[156px]"
            aria-hidden="true"
          >
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              stroke="rgba(247,244,238,0.12)"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              className="text-brass-soft"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`${interestDash.toFixed(2)} ${CIRC.toFixed(2)}`}
              transform="rotate(-90 70 70)"
              suppressHydrationWarning
            />
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              className="text-ivory"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`${principalDash.toFixed(2)} ${CIRC.toFixed(2)}`}
              strokeDashoffset={(-interestDash).toFixed(2)}
              transform="rotate(-90 70 70)"
              suppressHydrationWarning
            />
          </svg>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-ivory" />
              Principal
            </li>
            <li className="flex items-center gap-2 text-ivory/70">
              <span className="h-2 w-2 bg-brass-soft" />
              Interest
            </li>
          </ul>
        </div>

        <dl className="mt-8 space-y-4 border-t border-ivory/15 pt-7 text-sm">
          <Row label="Loan amount" value={formatInrExact(estimate.principal)} />
          {estimate.downPayment > 0 ? (
            <Row
              label="Down payment"
              value={formatInrExact(estimate.downPayment)}
            />
          ) : null}
          <Row
            label="Total interest"
            value={formatInrExact(estimate.totalInterest)}
          />
          <Row
            label="Total repayment"
            value={formatInrExact(estimate.totalPayment)}
          />
          {estimate.processingFee > 0 ? (
            <Row
              label="Processing fee"
              value={formatInrExact(estimate.processingFee)}
            />
          ) : null}
        </dl>

        <p className="mt-6 text-xs leading-relaxed text-ivory/55">
          This is an indicative estimate. Actual rates, eligibility, charges and
          repayment terms may vary by lender.
        </p>

        <ButtonLink
          href={whatsapp}
          variant="primary"
          external
          className="emi-no-print mt-8 h-auto w-full px-5 py-3.5 text-center leading-snug"
        >
          <span className="max-w-full text-pretty">
            Discuss financing on WhatsApp
          </span>
        </ButtonLink>
        <button
          type="button"
          className="emi-no-print mt-4 min-h-11 text-left text-sm text-ivory/70 underline-offset-4 hover:text-ivory hover:underline"
          onClick={onOpenSchedule}
        >
          View repayment schedule ↓
        </button>
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3">
      <dt className="min-w-0 shrink text-[13px] text-ivory/55 sm:text-sm">{label}</dt>
      <dd className="min-w-0 break-words text-right text-[13px] tabular-nums sm:text-sm">
        {value}
      </dd>
    </div>
  );
}

function MoneyField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  error,
  hint,
  dragBind,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  error?: string;
  hint?: string;
  dragBind: DragBind;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const current = clamp(value, min, max);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.16em] text-brass">
        {label}
      </label>
      <div className="mt-2 flex min-h-12 items-center border border-ink/15 bg-ivory focus-within:border-ink/40">
        <span className="pl-3 text-ink-muted">₹</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          className="emi-input min-h-12 min-w-0 w-full bg-transparent px-3 text-base outline-none"
          value={draft ?? formatInrGrouped(roundRupee(value))}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          onFocus={() => setDraft(formatInrGrouped(roundRupee(value)))}
          onChange={(event) => {
            setDraft(event.target.value);
            const parsed = parseInrInput(event.target.value);
            if (parsed !== null && parsed >= 0) onChange(parsed);
          }}
          onBlur={() => {
            const parsed = parseInrInput(draft ?? "");
            if (parsed !== null) onChange(clamp(parsed, min, max));
            setDraft(null);
          }}
        />
      </div>
      <div className="overflow-x-clip px-3">
        <RangeInput
          label={label}
          min={min}
          max={max}
          step={step}
          value={current}
          valuetext={formatInrExact(value)}
          dragBind={dragBind}
          onChange={onChange}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        <span>{formatInrCompact(min)}</span>
        <span>{formatInrCompact(max)}</span>
      </div>
      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  digits = 0,
  suffix,
  onChange,
  error,
  dragBind,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  digits?: number;
  suffix?: string;
  onChange: (value: number) => void;
  error?: string;
  dragBind: DragBind;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const errorId = error ? `${id}-error` : undefined;
  const shown = digits > 0 ? value.toFixed(digits) : String(value);
  const current = clamp(value, min, max);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.16em] text-brass">
        {label}
      </label>
      <div className="mt-2 flex min-h-12 items-center border border-ink/15 bg-ivory focus-within:border-ink/40">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          className="emi-input min-h-12 min-w-0 w-full bg-transparent px-3 text-base outline-none"
          value={draft ?? shown}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          onFocus={() => setDraft(shown)}
          onChange={(event) => {
            setDraft(event.target.value);
            const next = Number(event.target.value);
            if (Number.isFinite(next) && next >= 0) onChange(next);
          }}
          onBlur={() => {
            const next = Number(draft ?? shown);
            if (Number.isFinite(next)) onChange(clamp(next, min, max));
            setDraft(null);
          }}
        />
        {suffix ? (
          <span className="pr-3 text-sm text-ink-muted">{suffix}</span>
        ) : null}
      </div>
      <div className="overflow-x-clip px-3">
        <RangeInput
          label={label}
          min={min}
          max={max}
          step={step}
          value={current}
          valuetext={`${shown}${suffix ? ` ${suffix}` : ""}`}
          dragBind={dragBind}
          onChange={onChange}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        <span>
          {digits ? min.toFixed(digits) : min}
          {suffix ? ` ${suffix}` : ""}
        </span>
        <span>
          {digits ? max.toFixed(digits) : max}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RangeInput({
  label,
  min,
  max,
  step,
  value,
  valuetext,
  onChange,
  dragBind,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  valuetext: string;
  onChange: (value: number) => void;
  dragBind: DragBind;
}) {
  const span = max - min;
  const pct = span <= 0 ? 0 : ((value - min) / span) * 100;

  return (
    <input
      type="range"
      className="emi-range mt-4"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={label}
      aria-valuetext={valuetext}
      style={{
        backgroundImage: `linear-gradient(to right, var(--color-brass) ${pct}%, color-mix(in srgb, var(--color-ink) 12%, transparent) ${pct}%)`,
        backgroundSize: "100% 3px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onChange={(event) => onChange(Number(event.target.value))}
      {...dragBind}
    />
  );
}

function ScheduleTable({
  rows,
  page,
  pages,
  total,
  estimate,
  onPage,
}: {
  rows: AmortisationRow[];
  page: number;
  pages: number;
  total: number;
  estimate: ReturnType<typeof estimateEmi>;
  onPage: (page: number) => void;
}) {
  if (total === 0) {
    return (
      <p className="mt-4 text-sm text-ink-muted">
        Enter a valid loan to see the month-by-month schedule.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-sm text-ink-muted">
        {total} months · EMI {formatInrExact(estimate.emi)} · total interest{" "}
        {formatInrExact(estimate.totalInterest)}
      </p>
      <p className="mt-2 text-xs text-ink-muted md:hidden">
        Swipe the table to see every column.
      </p>
      <div className="mt-4 overflow-x-auto border border-ink/10 [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Month-by-month amortisation schedule</caption>
          <thead>
            <tr className="border-b border-ink/15 bg-ivory-deep/60 text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              <th className="px-3 py-3 font-medium">Month</th>
              <th className="px-3 py-3 font-medium">EMI</th>
              <th className="px-3 py-3 font-medium">Principal</th>
              <th className="px-3 py-3 font-medium">Interest</th>
              <th className="px-3 py-3 font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month} className="border-b border-ink/8">
                <td className="px-3 py-3 tabular-nums">{row.month}</td>
                <td className="px-3 py-3 tabular-nums">{formatInrExact(row.emi)}</td>
                <td className="px-3 py-3 tabular-nums">
                  {formatInrExact(row.principalPaid)}
                </td>
                <td className="px-3 py-3 tabular-nums">
                  {formatInrExact(row.interestPaid)}
                </td>
                <td className="px-3 py-3 tabular-nums">
                  {formatInrExact(row.closing)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-muted">
          Page {page + 1} of {pages}
        </p>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button
            variant="ghostInk"
            className="min-h-11 flex-1 px-4 sm:flex-none"
            disabled={page === 0}
            onClick={() => onPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="ghostInk"
            className="min-h-11 flex-1 px-4 sm:flex-none"
            disabled={page >= pages - 1}
            onClick={() => onPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
