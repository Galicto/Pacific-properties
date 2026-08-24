import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatInr(amount: number) {
  if (amount >= 10_000_000) {
    const crores = amount / 10_000_000;
    const formatted = Number.isInteger(crores)
      ? crores.toFixed(0)
      : crores.toFixed(2).replace(/\.?0+$/, "");
    return `₹${formatted} Cr`;
  }
  if (amount >= 100_000) {
    const lakhs = amount / 100_000;
    const formatted = Number.isInteger(lakhs)
      ? lakhs.toFixed(0)
      : lakhs.toFixed(1).replace(/\.0$/, "");
    return `₹${formatted} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}
