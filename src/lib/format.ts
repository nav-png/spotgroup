const priceFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-CA");

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}
