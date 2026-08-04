"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LandingView } from "@/components/dashboard/landing-view";
import { ConnectedDashboard } from "@/components/dashboard/connected-dashboard";
import { WalletConnectModal } from "@/components/dashboard/wallet-connect-modal";
import {
  computeCountdown,
  type CountdownUnit,
  type VoteOptionKey,
} from "@/lib/dashboard/mock-data";

type ConnectStep = "approve" | "sign" | null;

export function TokenDashboard() {
  const [selected, setSelected] = useState<VoteOptionKey | null>(null);
  const [voted, setVoted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [step, setStep] = useState<ConnectStep>(null);
  const [countdown, setCountdown] = useState<CountdownUnit[]>(() =>
    computeCountdown(),
  );

  const connectTimer1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearConnectTimers = useCallback(() => {
    if (connectTimer1.current) {
      clearTimeout(connectTimer1.current);
      connectTimer1.current = null;
    }
    if (connectTimer2.current) {
      clearTimeout(connectTimer2.current);
      connectTimer2.current = null;
    }
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setCountdown(computeCountdown()), 1000);
    return () => {
      clearInterval(tick);
      clearConnectTimers();
    };
  }, [clearConnectTimers]);

  const cancelConnect = useCallback(() => {
    clearConnectTimers();
    setConnecting(null);
    setStep(null);
  }, [clearConnectTimers]);

  const beginConnect = useCallback(
    (name: string) => {
      if (connecting) return;
      setConnecting(name);
      setStep("approve");
      setModalOpen(true);

      connectTimer1.current = setTimeout(() => {
        setStep("sign");
        connectTimer2.current = setTimeout(() => {
          setConnected(true);
          setModalOpen(false);
          setConnecting(null);
          setStep(null);
        }, 1500);
      }, 1400);
    },
    [connecting],
  );

  const closeModal = useCallback(() => {
    cancelConnect();
    setModalOpen(false);
  }, [cancelConnect]);

  const disconnect = useCallback(() => {
    setConnected(false);
    setSelected(null);
    setVoted(false);
  }, []);

  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 84,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="dashboard-root">
      <DashboardHeader
        connected={connected}
        onOpenModal={() => setModalOpen(true)}
        onDisconnect={disconnect}
        onNavigate={navigateTo}
      />

      {!connected && (
        <LandingView
          countdown={countdown}
          onOpenModal={() => setModalOpen(true)}
        />
      )}

      {connected && (
        <ConnectedDashboard
          selected={selected}
          voted={voted}
          onSelectOption={setSelected}
          onCastVote={() => {
            if (selected && !voted) setVoted(true);
          }}
        />
      )}

      <WalletConnectModal
        open={modalOpen}
        connecting={connecting}
        step={step}
        onClose={closeModal}
        onConnect={beginConnect}
        onCancelConnect={cancelConnect}
      />
    </div>
  );
}
