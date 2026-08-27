export const emiDefaults = {
  defaultInterestRate: 8.5,
  defaultTenureYears: 20,
  defaultDownPaymentPercent: 20,
  currency: "INR",
  defaultLoanAmount: 10_000_000,
  minLoanAmount: 100_000,
  maxLoanAmount: 500_000_000,
  minPropertyPrice: 500_000,
  maxPropertyPrice: 500_000_000,
  minRate: 0,
  maxRate: 20,
  minTenureYears: 1,
  maxTenureYears: 30,
} as const;

export type EmiMode = "price" | "loan";

export type EmiInput = {
  principal: number;
  annualRatePercent: number;
  tenureYears: number;
  tenureMonths?: number;
  processingFeePercent?: number;
  processingFeeFixed?: number;
  prepayment?: number;
  downPayment?: number;
};

export type EmiEstimate = {
  principal: number;
  monthlyRate: number;
  months: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  downPayment: number;
  processingFee: number;
  prepayment: number;
  totalUpfront: number;
  annualRatePercent: number;
  tenureYears: number;
  tenureMonths: number;
};

export type AmortisationRow = {
  month: number;
  opening: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  closing: number;
};

export type EmiValidation = {
  principal?: string;
  annualRatePercent?: string;
  tenure?: string;
  propertyPrice?: string;
  downPayment?: string;
};

export type EmiPersistedState = {
  mode: EmiMode;
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  loanLocked: boolean;
  annualRatePercent: number;
  tenureYears: number;
  tenureMonths: number;
  processingFeePercent: number;
  processingFeeFixed: number;
  prepayment: number;
  propertySlug?: string;
  propertyTitle?: string;
  propertyLocation?: string;
};

export type EmiCalculatorLinkInput = {
  title?: string;
  location?: string;
  price?: number | null;
  slug?: string;
};

export const EMI_STORAGE_KEY = "pacific-emi-state";

export function monthsFromTenure(years: number, extraMonths = 0) {
  const y = Number.isFinite(years) ? years : 0;
  const m = Number.isFinite(extraMonths) ? extraMonths : 0;
  return Math.max(0, Math.round(y * 12 + m));
}

export function processingFeeAmount(
  principal: number,
  percent = 0,
  fixed = 0,
) {
  const p = Math.max(0, percent) / 100;
  return Math.max(0, principal) * p + Math.max(0, fixed);
}

/**
 * Standard reducing-balance EMI. Full-precision; round only at display.
 */
export function monthlyEmi(
  principal: number,
  annualRatePercent: number,
  months: number,
): number {
  if (!Number.isFinite(principal) || principal <= 0) return 0;
  if (!Number.isFinite(months) || months <= 0) return 0;
  if (!Number.isFinite(annualRatePercent) || annualRatePercent < 0) return 0;

  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return principal / months;

  const factor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function estimateEmi(input: EmiInput): EmiEstimate {
  const tenureMonths = input.tenureMonths ?? 0;
  const months = monthsFromTenure(input.tenureYears, tenureMonths);
  const prepayment = Math.max(0, input.prepayment ?? 0);
  const downPayment = Math.max(0, input.downPayment ?? 0);
  const rawPrincipal = Math.max(0, input.principal);
  const principal = Math.max(0, rawPrincipal - Math.min(prepayment, rawPrincipal));
  const monthlyRate = Math.max(0, input.annualRatePercent) / 12 / 100;
  const emi = monthlyEmi(principal, input.annualRatePercent, months);
  const totalPayment = emi * months;
  const processingFee = processingFeeAmount(
    principal,
    input.processingFeePercent,
    input.processingFeeFixed,
  );

  return {
    principal,
    monthlyRate,
    months,
    emi,
    totalPayment,
    totalInterest: Math.max(0, totalPayment - principal),
    downPayment,
    processingFee,
    prepayment: Math.min(prepayment, rawPrincipal),
    totalUpfront: downPayment + processingFee + Math.min(prepayment, rawPrincipal),
    annualRatePercent: input.annualRatePercent,
    tenureYears: input.tenureYears,
    tenureMonths,
  };
}

export function amortisationSchedule(input: EmiInput): AmortisationRow[] {
  const estimate = estimateEmi(input);
  const { months, emi, monthlyRate, principal } = estimate;
  if (months <= 0 || principal <= 0) return [];

  const rows: AmortisationRow[] = [];
  let remaining = principal;

  for (let month = 1; month <= months; month += 1) {
    const opening = remaining;
    const interestPaid = remaining * monthlyRate;
    let principalPaid = emi - interestPaid;
    let payment = emi;

    if (month === months || principalPaid >= remaining) {
      principalPaid = remaining;
      payment = principalPaid + interestPaid;
      remaining = 0;
    } else {
      remaining -= principalPaid;
      if (remaining < 0.000001) remaining = 0;
    }

    rows.push({
      month,
      opening,
      emi: payment,
      principalPaid,
      interestPaid,
      closing: remaining,
    });
  }

  return rows;
}

export function validateEmiInput(
  input: EmiInput & {
    mode?: EmiMode;
    propertyPrice?: number | null;
  },
): EmiValidation {
  const errors: EmiValidation = {};
  const months = monthsFromTenure(input.tenureYears, input.tenureMonths);

  if (!Number.isFinite(input.principal) || input.principal < 0) {
    errors.principal = "Enter a loan amount of zero or more.";
  } else if (input.principal === 0) {
    errors.principal = "Enter a loan amount greater than zero.";
  } else if (input.principal > emiDefaults.maxLoanAmount) {
    errors.principal = "That loan amount is beyond the range of this estimate.";
  }

  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    errors.annualRatePercent = "Enter an interest rate of 0% or more.";
  } else if (input.annualRatePercent > emiDefaults.maxRate) {
    errors.annualRatePercent = `Use a rate up to ${emiDefaults.maxRate}%.`;
  }

  if (months <= 0) {
    errors.tenure = "Tenure must be at least one month.";
  }

  if (input.mode === "price") {
    const price = input.propertyPrice ?? 0;
    if (!price) {
      errors.propertyPrice = "Enter a property price, or switch to loan amount.";
    } else if (input.principal > price + 0.5) {
      errors.principal = "Loan amount cannot exceed the property price.";
    }
    if ((input.downPayment ?? 0) < 0) {
      errors.downPayment = "Down payment cannot be negative.";
    } else if (price && (input.downPayment ?? 0) > price) {
      errors.downPayment = "Down payment cannot exceed the property price.";
    }
  }

  return errors;
}

export function roundRupee(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value);
}

export function formatInrExact(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(roundRupee(value));
}

export function formatInrGrouped(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    roundRupee(value),
  );
}

export function downPaymentPercent(price: number, down: number) {
  if (!(price > 0)) return emiDefaults.defaultDownPaymentPercent;
  return Math.round((Math.max(0, down) / price) * 1000) / 10;
}

export function emiCalculatorHref(input: EmiCalculatorLinkInput = {}) {
  const params = new URLSearchParams();
  if (input.title) params.set("property", input.title);
  if (input.location) params.set("location", input.location);
  if (typeof input.price === "number" && input.price > 0) {
    params.set("price", String(roundRupee(input.price)));
  }
  if (input.slug) params.set("slug", input.slug);
  const query = params.toString();
  return query ? `/emi-calculator?${query}` : "/emi-calculator";
}

export function formatInrCompact(value: number) {
  const amount = roundRupee(value);
  if (Math.abs(amount) >= 10_000_000) {
    const crores = amount / 10_000_000;
    const formatted = Number.isInteger(crores)
      ? crores.toFixed(0)
      : crores.toFixed(2).replace(/\.?0+$/, "");
    return `₹${formatted} Cr`;
  }
  if (Math.abs(amount) >= 100_000) {
    const lakhs = amount / 100_000;
    const formatted = Number.isInteger(lakhs)
      ? lakhs.toFixed(0)
      : lakhs.toFixed(1).replace(/\.0$/, "");
    return `₹${formatted} L`;
  }
  return formatInrExact(amount);
}

export function parseInrInput(raw: string) {
  const cleaned = raw.replace(/[₹,\s]/g, "").replace(/cr$/i, "");
  if (cleaned === "" || cleaned === "-") return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

export function defaultStateFromPrice(
  price: number | null | undefined,
  extras?: Pick<
    EmiPersistedState,
    "propertySlug" | "propertyTitle" | "propertyLocation"
  >,
): EmiPersistedState {
  const { defaultDownPaymentPercent, defaultInterestRate, defaultTenureYears, defaultLoanAmount } =
    emiDefaults;
  const hasPrice = typeof price === "number" && price > 0;
  const propertyPrice = hasPrice ? price : 0;
  const downPayment = hasPrice
    ? roundRupee((propertyPrice * defaultDownPaymentPercent) / 100)
    : 0;
  const loanAmount = hasPrice ? Math.max(0, propertyPrice - downPayment) : defaultLoanAmount;

  return {
    mode: hasPrice ? "price" : "loan",
    propertyPrice,
    downPayment,
    loanAmount,
    loanLocked: false,
    annualRatePercent: defaultInterestRate,
    tenureYears: defaultTenureYears,
    tenureMonths: 0,
    processingFeePercent: 0,
    processingFeeFixed: 0,
    prepayment: 0,
    ...extras,
  };
}

export function derivedLoanAmount(state: EmiPersistedState) {
  if (state.mode === "price" && !state.loanLocked && state.propertyPrice > 0) {
    return Math.max(0, state.propertyPrice - state.downPayment);
  }
  return Math.max(0, state.loanAmount);
}

export function persistEmiState(state: EmiPersistedState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(EMI_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode */
  }
}

export function readEmiState(): EmiPersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(EMI_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EmiPersistedState;
  } catch {
    return null;
  }
}

export function emiStateToQuery(state: EmiPersistedState) {
  const params = new URLSearchParams();
  params.set("mode", state.mode);
  if (state.propertyTitle) params.set("property", state.propertyTitle);
  if (state.propertyLocation) params.set("location", state.propertyLocation);
  if (state.propertySlug) params.set("slug", state.propertySlug);
  if (state.propertyPrice) params.set("price", String(roundRupee(state.propertyPrice)));
  params.set("down", String(roundRupee(state.downPayment)));
  params.set("loan", String(roundRupee(derivedLoanAmount(state))));
  params.set("rate", String(state.annualRatePercent));
  params.set("years", String(state.tenureYears));
  if (state.tenureMonths) params.set("months", String(state.tenureMonths));
  return params;
}

export function emiStateFromQuery(
  params: URLSearchParams,
  fallbackPrice?: number | null,
): EmiPersistedState {
  const queryPrice = Number(params.get("price"));
  const hasQueryPrice = Number.isFinite(queryPrice) && queryPrice > 0;
  const title = params.get("property") || undefined;
  const location = params.get("location") || undefined;
  const slug = params.get("slug") || undefined;
  const base = defaultStateFromPrice(hasQueryPrice ? queryPrice : fallbackPrice, {
    propertyTitle: title,
    propertyLocation: location,
    propertySlug: slug,
  });
  const mode = params.get("mode");
  if (mode === "price" || mode === "loan") base.mode = mode;
  else if (hasQueryPrice) base.mode = "price";
  const downRaw = params.get("down");
  if (downRaw !== null) {
    const down = Number(downRaw);
    if (Number.isFinite(down) && down >= 0) {
      base.downPayment = down;
      if (base.mode === "price" && !params.has("loan")) {
        base.loanAmount = Math.max(0, base.propertyPrice - down);
        base.loanLocked = false;
      }
    }
  }
  const loanRaw = params.get("loan");
  if (loanRaw !== null) {
    const loan = Number(loanRaw);
    if (loan > 0) {
      base.loanAmount = loan;
      base.loanLocked = true;
    }
  }
  const rateRaw = params.get("rate");
  if (rateRaw !== null) {
    const rate = Number(rateRaw);
    if (Number.isFinite(rate) && rate >= 0) base.annualRatePercent = rate;
  }
  const yearsRaw = params.get("years");
  if (yearsRaw !== null) {
    const years = Number(yearsRaw);
    if (years > 0) base.tenureYears = years;
  }
  const monthsRaw = params.get("months");
  if (monthsRaw !== null) {
    const months = Number(monthsRaw);
    if (months >= 0) base.tenureMonths = months;
  }
  return base;
}

export function financingWhatsAppText(opts: {
  propertyTitle?: string;
  area?: string;
  loanAmount: number;
  emi: number;
  rate: number;
  tenureYears: number;
}) {
  const property = opts.propertyTitle
    ? ` Property: ${opts.propertyTitle}${opts.area ? ` in ${opts.area}` : ""}.`
    : "";
  return `Hello Pacific Properties, I would like to discuss financing.${property} Loan amount: ${formatInrExact(opts.loanAmount)}, estimated EMI: ${formatInrExact(opts.emi)}, rate: ${opts.rate}%, tenure: ${opts.tenureYears} years.`;
}
