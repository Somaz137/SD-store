export function priceToNumber(price) {
  const digits = String(price).replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}
