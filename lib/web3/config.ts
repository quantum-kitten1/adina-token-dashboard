import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, baseSepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

/** Base mainnet + Base Sepolia (test token only). */
export const networks = [base, baseSepolia] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId: projectId || "00000000000000000000000000000000",
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
