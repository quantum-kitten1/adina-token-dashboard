"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LandingView } from "@/components/dashboard/landing-view";
import { ConnectedDashboard } from "@/components/dashboard/connected-dashboard";
import {
  computeCountdown,
  type CountdownUnit,
  type VoteOptionKey,
} from "@/lib/dashboard/mock-data";
import { isTokenLive, truncateAddress } from "@/lib/web3/env";

export function TokenDashboard() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [selected, setSelected] = useState<VoteOptionKey | null>(null);
  const [voted, setVoted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownUnit[]>(() =>
    computeCountdown(),
  );

  useEffect(() => {
    const tick = setInterval(() => setCountdown(computeCountdown()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setSelected(null);
      setVoted(false);
    }
  }, [isConnected]);

  const openConnect = useCallback(() => {
    void open({ view: "Connect" });
  }, [open]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setSelected(null);
    setVoted(false);
  }, [disconnect]);

  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 84,
        behavior: "smooth",
      });
    }
  }, []);

  const displayAddress = address ? truncateAddress(address) : "";

  return (
    <div className="dashboard-root">
      {!isTokenLive && (
        <div
          role="status"
          style={{
            textAlign: "center",
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            color: "#c9b8ff",
            background: "rgba(139,92,246,.14)",
            borderBottom: "1px solid rgba(139,92,246,.28)",
          }}
        >
          Pre-market on Base — ADINA is not live yet. Connect your wallet to
          explore the dashboard.
        </div>
      )}

      <DashboardHeader
        connected={isConnected}
        address={displayAddress}
        onOpenModal={openConnect}
        onDisconnect={handleDisconnect}
        onNavigate={navigateTo}
      />

      {!isConnected && (
        <LandingView countdown={countdown} onOpenModal={openConnect} />
      )}

      {isConnected && (
        <ConnectedDashboard
          selected={selected}
          voted={voted}
          onSelectOption={setSelected}
          onCastVote={() => {
            if (selected && !voted) setVoted(true);
          }}
        />
      )}
    </div>
  );
}
