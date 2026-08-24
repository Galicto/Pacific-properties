import assert from "node:assert/strict";
import { test } from "node:test";
import {
  amortisationSchedule,
  defaultStateFromPrice,
  derivedLoanAmount,
  emiCalculatorHref,
  emiStateFromQuery,
  estimateEmi,
  financingWhatsAppText,
  formatInrExact,
  monthlyEmi,
  monthsFromTenure,
  parseInrInput,
  processingFeeAmount,
  roundRupee,
  validateEmiInput,
} from "./emi.ts";

function formulaEmi(p: number, annual: number, n: number) {
  const r = annual / 12 / 100;
  if (r === 0) return p / n;
  const f = (1 + r) ** n;
  return (p * r * f) / (f - 1);
}

test("standard reducing-balance EMI matches the closed-form formula", () => {
  const cases = [
    { p: 5_000_000, rate: 8.5, years: 20 },
    { p: 10_000_000, rate: 8.5, years: 20 },
    { p: 30_000_000, rate: 8.75, years: 15 },
    { p: 100_000_000, rate: 9, years: 25 },
  ];

  for (const item of cases) {
    const n = item.years * 12;
    const expected = formulaEmi(item.p, item.rate, n);
    const actual = monthlyEmi(item.p, item.rate, n);
    assert.ok(Math.abs(actual - expected) < 1e-8, `${item.p} mismatch`);
    const estimate = estimateEmi({
      principal: item.p,
      annualRatePercent: item.rate,
      tenureYears: item.years,
    });
    assert.equal(estimate.months, n);
    assert.ok(Math.abs(estimate.emi - expected) < 1e-8);
    assert.ok(Math.abs(estimate.totalPayment - expected * n) < 1e-6);
    assert.ok(Math.abs(estimate.totalInterest - (expected * n - item.p)) < 1e-6);
  }
});

test("zero-interest loans split principal evenly", () => {
  const estimate = estimateEmi({
    principal: 10_000_000,
    annualRatePercent: 0,
    tenureYears: 20,
  });
  assert.equal(estimate.emi, 10_000_000 / 240);
  assert.equal(estimate.totalInterest, 0);
  assert.equal(roundRupee(estimate.emi), 41667);
});

test("decimal interest rates are accepted to two places", () => {
  const a = monthlyEmi(7_800_000, 8.25, 240);
  const b = monthlyEmi(7_800_000, 8.26, 240);
  assert.ok(b > a);
  assert.ok(Math.abs(a - formulaEmi(7_800_000, 8.25, 240)) < 1e-8);
});

test("invalid and edge inputs are rejected or zeroed", () => {
  assert.equal(monthlyEmi(-1, 8.5, 240), 0);
  assert.equal(monthlyEmi(1_000_000, 8.5, 0), 0);
  assert.equal(monthlyEmi(1_000_000, -1, 240), 0);

  const errors = validateEmiInput({
    principal: -10,
    annualRatePercent: -1,
    tenureYears: 0,
    mode: "price",
    propertyPrice: 5_000_000,
    downPayment: 6_000_000,
  });
  assert.ok(errors.principal);
  assert.ok(errors.annualRatePercent);
  assert.ok(errors.tenure);
  assert.ok(errors.downPayment);

  const overLoan = validateEmiInput({
    principal: 6_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
    mode: "price",
    propertyPrice: 5_000_000,
    downPayment: 0,
  });
  assert.equal(
    overLoan.principal,
    "Loan amount cannot exceed the property price.",
  );
});

test("amortisation totals match the main estimate", () => {
  const input = {
    principal: 12_500_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
  };
  const estimate = estimateEmi(input);
  const rows = amortisationSchedule(input);
  assert.equal(rows.length, 240);
  const principalPaid = rows.reduce((sum, row) => sum + row.principalPaid, 0);
  const interestPaid = rows.reduce((sum, row) => sum + row.interestPaid, 0);
  assert.ok(Math.abs(principalPaid - estimate.principal) < 0.5);
  assert.ok(Math.abs(interestPaid - estimate.totalInterest) < 1);
  assert.equal(rows[rows.length - 1].closing, 0);
  assert.ok(rows[0].opening === estimate.principal);
});

test("prepayment reduces principal used for EMI", () => {
  const without = estimateEmi({
    principal: 10_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
  });
  const withPrepay = estimateEmi({
    principal: 10_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
    prepayment: 1_000_000,
  });
  assert.equal(withPrepay.principal, 9_000_000);
  assert.ok(withPrepay.emi < without.emi);
});

test("derived loan amount respects lock and price mode", () => {
  const derived = derivedLoanAmount({
    mode: "price",
    propertyPrice: 10_000_000,
    downPayment: 2_000_000,
    loanAmount: 1,
    loanLocked: false,
    annualRatePercent: 8.5,
    tenureYears: 20,
    tenureMonths: 0,
    processingFeePercent: 0,
    processingFeeFixed: 0,
    prepayment: 0,
  });
  assert.equal(derived, 8_000_000);

  const locked = derivedLoanAmount({
    mode: "price",
    propertyPrice: 10_000_000,
    downPayment: 2_000_000,
    loanAmount: 6_500_000,
    loanLocked: true,
    annualRatePercent: 8.5,
    tenureYears: 20,
    tenureMonths: 0,
    processingFeePercent: 0,
    processingFeeFixed: 0,
    prepayment: 0,
  });
  assert.equal(locked, 6_500_000);
});

test("INR parser accepts Indian grouping", () => {
  assert.equal(parseInrInput("₹1,25,00,000"), 12_500_000);
  assert.equal(parseInrInput("10000000"), 10_000_000);
  assert.equal(parseInrInput(""), null);
});

test("₹50L, ₹1Cr, ₹3Cr and ₹10Cr at 8.5% for 20 years", () => {
  const cases = [
    { label: "₹50L", p: 5_000_000 },
    { label: "₹1Cr", p: 10_000_000 },
    { label: "₹3Cr", p: 30_000_000 },
    { label: "₹10Cr", p: 100_000_000 },
  ];
  for (const item of cases) {
    const expected = formulaEmi(item.p, 8.5, 240);
    const estimate = estimateEmi({
      principal: item.p,
      annualRatePercent: 8.5,
      tenureYears: 20,
    });
    assert.ok(
      Math.abs(estimate.emi - expected) < 1e-8,
      `${item.label} EMI mismatch`,
    );
    assert.equal(estimate.months, 240);
  }
});

test("extra months lengthen tenure and lower EMI", () => {
  assert.equal(monthsFromTenure(20, 6), 246);
  const base = estimateEmi({
    principal: 10_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
  });
  const longer = estimateEmi({
    principal: 10_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
    tenureMonths: 6,
  });
  assert.equal(longer.months, 246);
  assert.ok(longer.emi < base.emi);
});

test("processing fee is percent of principal plus a fixed charge", () => {
  assert.equal(processingFeeAmount(10_000_000, 1, 5_000), 105_000);
  const estimate = estimateEmi({
    principal: 10_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
    downPayment: 2_000_000,
    processingFeePercent: 1,
    processingFeeFixed: 5_000,
  });
  assert.equal(estimate.processingFee, 105_000);
  assert.equal(estimate.totalUpfront, 2_105_000);
});

test("price-mode validation requires a property price", () => {
  const errors = validateEmiInput({
    principal: 8_000_000,
    annualRatePercent: 8.5,
    tenureYears: 20,
    mode: "price",
    propertyPrice: 0,
    downPayment: 0,
  });
  assert.ok(errors.propertyPrice);
});

test("default state from a known price uses 20% down payment", () => {
  const priced = defaultStateFromPrice(10_000_000);
  assert.equal(priced.mode, "price");
  assert.equal(priced.downPayment, 2_000_000);
  assert.equal(priced.loanAmount, 8_000_000);
  assert.equal(priced.annualRatePercent, 8.5);
  assert.equal(priced.tenureYears, 20);

  const unknown = defaultStateFromPrice(null);
  assert.equal(unknown.mode, "loan");
  assert.equal(unknown.loanAmount, 10_000_000);
});

test("INR display uses Indian grouping", () => {
  assert.match(formatInrExact(12_500_000), /1,25,00,000/);
  assert.match(formatInrExact(5_000_000), /50,00,000/);
});

test("EMI page links pass property title, location and price", () => {
  const href = emiCalculatorHref({
    title: "Casa da Maré",
    location: "Siolim",
    price: 18_000_000,
    slug: "casa-da-mare",
  });
  assert.equal(href.includes("/emi-calculator?"), true);
  const params = new URLSearchParams(href.split("?")[1]);
  assert.equal(params.get("property"), "Casa da Maré");
  assert.equal(params.get("location"), "Siolim");
  assert.equal(params.get("price"), "18000000");
  assert.equal(params.get("slug"), "casa-da-mare");

  const por = emiCalculatorHref({
    title: "Casa da Maré",
    location: "Siolim",
    slug: "casa-da-mare",
  });
  assert.equal(new URLSearchParams(por.split("?")[1]).has("price"), false);
});

test("query parser seeds price mode from a listing URL", () => {
  const params = new URLSearchParams(
    "property=Casa%20da%20Mar%C3%A9&price=18000000&location=Siolim&slug=casa-da-mare",
  );
  const state = emiStateFromQuery(params);
  assert.equal(state.mode, "price");
  assert.equal(state.propertyPrice, 18_000_000);
  assert.equal(state.downPayment, 3_600_000);
  assert.equal(state.loanAmount, 14_400_000);
  assert.equal(state.propertyTitle, "Casa da Maré");
  assert.equal(state.propertyLocation, "Siolim");
});

test("financing WhatsApp copy includes the estimate", () => {
  const text = financingWhatsAppText({
    propertyTitle: "Villa Sereno",
    area: "Assagao",
    loanAmount: 100_000_000,
    emi: 86_782,
    rate: 8.5,
    tenureYears: 20,
  });
  assert.match(text, /Villa Sereno/);
  assert.match(text, /Assagao/);
  assert.match(text, /8\.5%/);
});
