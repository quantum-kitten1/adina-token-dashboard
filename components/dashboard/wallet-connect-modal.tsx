"use client";

import Image from "next/image";
import { WALLET_DEFS } from "@/lib/dashboard/mock-data";

type ConnectStep = "approve" | "sign" | null;

type WalletConnectModalProps = {
  open: boolean;
  connecting: string | null;
  step: ConnectStep;
  onClose: () => void;
  onConnect: (name: string) => void;
  onCancelConnect: () => void;
};

export function WalletConnectModal({
  open,
  connecting,
  step,
  onClose,
  onConnect,
  onCancelConnect,
}: WalletConnectModalProps) {
  if (!open) return null;

  const connectingWallet = WALLET_DEFS.find((w) => w.name === connecting);

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(6,6,12,.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "dashboard-fadeUp .28s ease both",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 24,
          borderRadius: 20,
          background:
            "linear-gradient(160deg,rgba(26,26,38,.98),rgba(17,17,25,.98))",
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <h2
            id="wallet-modal-title"
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            {connecting ? `Connecting ${connecting}` : "Connect a wallet"}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              cursor: "pointer",
              width: 30,
              height: 30,
              borderRadius: 999,
              background: "rgba(255,255,255,.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a6a6b8",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
            }}
          >
            ×
          </button>
        </div>

        {!connecting ? (
          <>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: "#8a8a9c" }}>
              Your wallet is your identity here. Adina Labs only reads public
              on-chain data.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {WALLET_DEFS.map((wallet) => (
                <button
                  key={wallet.name}
                  type="button"
                  onClick={() => onConnect(wallet.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "13px 16px",
                    borderRadius: 13,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.1)",
                    cursor: "pointer",
                    transition: "all .18s ease",
                    textAlign: "left",
                    fontFamily: "inherit",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 40,
                      height: 40,
                      borderRadius: 11,
                      overflow: "hidden",
                      display: "flex",
                      boxShadow: "0 3px 10px rgba(0,0,0,.3)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#f3f3f8",
                      }}
                    >
                      {wallet.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#8a8a9c",
                        fontWeight: 500,
                      }}
                    >
                      {wallet.desc}
                    </div>
                  </div>
                  <span
                    style={{
                      color: "#7e7e95",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    ›
                  </span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 18, textAlign: "center" }}>
              <a href="#" style={{ fontSize: 13, fontWeight: 600 }}>
                Don&apos;t have a wallet? Learn more
              </a>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "14px 4px 4px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 88,
                height: 88,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 22,
              }}
            >
              <div
                className="dashboard-spin"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  border: "3px solid rgba(139,92,246,.18)",
                  borderTopColor: "#8b5cf6",
                }}
              />
              {connectingWallet && (
                <span
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    overflow: "hidden",
                    display: "flex",
                    position: "relative",
                    boxShadow: "0 6px 18px rgba(0,0,0,.4)",
                  }}
                >
                  <Image
                    src={connectingWallet.icon}
                    alt={connectingWallet.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </span>
              )}
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 18,
                fontWeight: 700,
                color: "#f3f3f8",
              }}
            >
              {step === "sign"
                ? "Confirm signature"
                : "Waiting for approval"}
            </h3>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "#a6a6b8",
                maxWidth: 300,
              }}
            >
              {step === "sign"
                ? "Sign the message in your wallet to verify ownership. This is free and does not authorize any transaction."
                : `Open the ${connecting} prompt and approve a read-only connection.`}
            </p>
            <div
              style={{
                display: "flex",
                gap: 6,
                width: "100%",
                maxWidth: 260,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 999,
                  background: step ? "#8b5cf6" : "rgba(255,255,255,.12)",
                }}
              />
              <span
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 999,
                  background:
                    step === "sign" ? "#8b5cf6" : "rgba(255,255,255,.12)",
                }}
              />
            </div>
            <button
              type="button"
              onClick={onCancelConnect}
              style={{
                fontFamily: "inherit",
                padding: "9px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(255,255,255,.04)",
                color: "#c9c9d6",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
