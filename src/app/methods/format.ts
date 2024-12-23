export function formatToUSD(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid number provided");
  }

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}