export type VoteOptionKey = "for" | "against" | "abstain";

export type CountdownUnit = {
  v: string;
  l: string;
};

export type WalletDef = {
  name: string;
  icon: string;
  desc: string;
};

export type GovernanceOptionRaw = {
  key: VoteOptionKey;
  label: string;
  pct: number;
};

export type TransactionRaw = {
  type: string;
  icon: string;
  amount: string;
  up: boolean;
  date: string;
  hash: string;
};

export const IDO_TARGET_DATE = "2026-11-04T16:00:00Z";

export const WALLET_DEFS: WalletDef[] = [
  {
    name: "MetaMask",
    icon: "/dashboard/wallet-metamask.svg",
    desc: "Browser extension",
  },
  {
    name: "WalletConnect",
    icon: "/dashboard/wallet-walletconnect.svg",
    desc: "Scan with mobile",
  },
  {
    name: "Coinbase Wallet",
    icon: "/dashboard/wallet-coinbase.svg",
    desc: "Coinbase app",
  },
];

export const GOVERNANCE_OPTIONS: GovernanceOptionRaw[] = [
  { key: "for", label: "For", pct: 62 },
  { key: "against", label: "Against", pct: 23 },
  { key: "abstain", label: "Abstain", pct: 15 },
];

export const TRANSACTIONS: TransactionRaw[] = [
  {
    type: "IDO Purchase",
    icon: "↓",
    amount: "+235 ADINA",
    up: true,
    date: "Jul 10, 2026",
    hash: "0x9c2e...41ab",
  },
];

export const MOCK_WALLET_ADDRESS = "0x7a3f...c9d2";

export function computeCountdown(now = Date.now()): CountdownUnit[] {
  const target = new Date(IDO_TARGET_DATE).getTime();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return [
    { v: pad(d), l: "Days" },
    { v: pad(h), l: "Hrs" },
    { v: pad(m), l: "Min" },
    { v: pad(s), l: "Sec" },
  ];
}

export function voteOptionColor(key: VoteOptionKey): string {
  if (key === "for") return "#34d399";
  if (key === "against") return "#f87171";
  return "#8a8a9c";
}
