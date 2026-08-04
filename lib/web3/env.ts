export const isTokenLive =
  process.env.NEXT_PUBLIC_TOKEN_LIVE === "true";

export const adinaTokenAddress =
  process.env.NEXT_PUBLIC_ADINA_TOKEN_ADDRESS?.trim() || undefined;

export function truncateAddress(address: string): string {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
