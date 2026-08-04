"use client";

import { wagmiAdapter, projectId, networks } from "@/lib/web3/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { base } from "@reown/appkit/networks";
import { type ReactNode, useState } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const metadata = {
  name: "ADINA Token Dashboard",
  description: "Non-custodial ADINA token dashboard on Base",
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : "https://adina-token-dashboard.vercel.app",
  icons: ["https://adina-token-dashboard.vercel.app/dashboard/logo.png"],
};

if (projectId) {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: base,
    metadata,
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#8b5cf6",
    },
    features: {
      analytics: true,
      email: false,
      socials: false,
    },
  });
}

type Web3ProviderProps = {
  children: ReactNode;
  cookies: string | null;
};

export function Web3Provider({ children, cookies }: Web3ProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
