"use client";

import Image from "next/image";
import type { CountdownUnit } from "@/lib/dashboard/mock-data";

type LandingViewProps = {
  countdown: CountdownUnit[];
  onOpenModal: () => void;
};

export function LandingView({ countdown, onOpenModal }: LandingViewProps) {
  return (
    <div className="dashboard-fade-up">
      <div className="dashboard-hero-grid">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(139,92,246,.14)",
              border: "1px solid rgba(139,92,246,.35)",
              marginBottom: 24,
            }}
          >
            <span
              className="dashboard-pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#34d399",
                boxShadow: "0 0 8px #34d399",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".02em",
                color: "#c9b8ff",
              }}
            >
              GENESIS IDO · Q4 2026
            </span>
          </div>
          <h1 className="dashboard-hero-title">
            The utility token powering the Adina Labs ecosystem.
          </h1>
          <p
            style={{
              margin: "0 0 32px",
              fontSize: 17,
              lineHeight: 1.6,
              color: "#c9c9d6",
              maxWidth: 520,
            }}
          >
            ADINA Token ($ADINA) powers five enterprise platforms under one
            deflationary model starting with a Decentralised Job Marketplace,
            Gig Economy, Carbon Credits, Nutraceuticals and Performance Racing -
            with governance and staking built in. Genesis Public IDO via Uniswap
            CCA in Q4 2026.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                fontFamily: "inherit",
                padding: "15px 30px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#fff",
                background: "linear-gradient(135deg,#8b5cf6,#7c4ff0)",
                boxShadow: "0 0 30px rgba(139,92,246,.5)",
              }}
            >
              Connect Wallet
            </button>
            <a
              href="#"
              style={{
                fontFamily: "inherit",
                padding: "15px 26px",
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 700,
                color: "#c9c9d6",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.12)",
              }}
            >
              Read the litepaper
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              fontSize: 12.5,
              color: "#8a8a9c",
              fontWeight: 500,
            }}
          >
            {["Non-custodial", "Audited contract", "Read-only dashboard"].map(
              (label) => (
                <span
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: 7 }}
                >
                  <span style={{ color: "#34d399", fontWeight: 800 }}>✓</span>
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="dashboard-hero-token-wrap">
          <div className="dashboard-hero-token-glow" />
          <Image
            src="/dashboard/adina-token.png"
            alt="ADINA token"
            width={300}
            height={300}
            className="dashboard-hero-token-img"
          />
        </div>
      </div>

      <div className="dashboard-container" style={{ paddingBottom: 0 }}>
        <div
          className="dashboard-ido-card"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "28px 32px",
            borderRadius: 20,
            background:
              "linear-gradient(150deg,rgba(139,92,246,.16),rgba(255,255,255,.04))",
            border: "1px solid rgba(139,92,246,.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Genesis Public IDO
              </h2>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#8a8a9c",
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                Uniswap CCA · Q4 2026
              </span>
            </div>
            <div className="dashboard-countdown-row">
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#a6a6b8",
                  marginRight: 4,
                }}
              >
                Opens in
              </span>
              {countdown.map((c) => (
                <div
                  key={c.l}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 48,
                    padding: "7px 8px",
                    borderRadius: 11,
                    background: "rgba(10,10,18,.5)",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      fontVariantNumeric: "tabular-nums",
                      color: "#f3f3f8",
                    }}
                  >
                    {c.v}
                  </span>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 600,
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      color: "#8a8a9c",
                    }}
                  >
                    {c.l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginBottom: 8,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              $0{" "}
              <span style={{ fontSize: 15, fontWeight: 600, color: "#8a8a9c" }}>
                raised of $15M target
              </span>
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#c9b8ff" }}>
              Sale not open yet
            </span>
          </div>
          <div
            style={{
              height: 12,
              borderRadius: 999,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.09)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "0%",
                height: "100%",
                background: "linear-gradient(90deg,#8b5cf6,#a78bfa)",
                boxShadow: "0 0 16px rgba(139,92,246,.6)",
              }}
            />
          </div>
          <div className="dashboard-grid-4-metrics">
            {[
              { label: "ISSUE PRICE FLOOR", value: "$0.17" },
              { label: "RAISE TARGET", value: "$15,000,000" },
              {
                label: "IDO ALLOCATION",
                value: (
                  <>
                    88,235,294{" "}
                    <span style={{ fontSize: 12, color: "#8a8a9c" }}>
                      ADINA
                    </span>
                  </>
                ),
              },
              { label: "INITIAL FDV", value: "$170,000,000" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "14px 16px",
                  background: "rgba(20,20,31,.7)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9aae",
                    marginBottom: 5,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 19, fontWeight: 700 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer
        className="dashboard-container"
        style={{ paddingTop: 32, paddingBottom: 56 }}
      >
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              flex: "none",
              marginTop: 1,
              width: 18,
              height: 18,
              borderRadius: 999,
              border: "1.5px solid #8fbcff",
              color: "#8fbcff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            i
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              lineHeight: 1.6,
              color: "#7e7e95",
              maxWidth: 920,
            }}
          >
            The Adina (ADINA) token is designed exclusively as a functional
            utility and governance token for platform access, fee settlement,
            and protocol voting within the Adina Labs ecosystem. Adina token
            does not constitute a security, financial instrument, equity, debt,
            or investment contract in any jurisdiction, nor does it grant any
            right to profits, dividends, or financial returns.
          </p>
        </div>
      </footer>
    </div>
  );
}
