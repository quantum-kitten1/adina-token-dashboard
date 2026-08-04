"use client";

import Image from "next/image";
import {
  GOVERNANCE_OPTIONS,
  TRANSACTIONS,
  voteOptionColor,
  type VoteOptionKey,
} from "@/lib/dashboard/mock-data";

type ConnectedDashboardProps = {
  selected: VoteOptionKey | null;
  voted: boolean;
  onSelectOption: (key: VoteOptionKey) => void;
  onCastVote: () => void;
  tokenBalanceLabel?: string;
  tokenSymbol?: string;
  balanceIsLive?: boolean;
  portfolioValueLabel?: string;
};

const ONBOARDING_STEPS = [
  {
    done: true,
    num: "✓",
    title: "Wallet connected",
    desc: "You are signed in.",
    active: true,
  },
  {
    done: false,
    num: "2",
    title: "Verify the contract",
    desc: "Confirm the official ADINA address.",
    active: false,
  },
  {
    done: false,
    num: "3",
    title: "Cast your first vote",
    desc: "Use your 235 votes in governance.",
    active: false,
  },
  {
    done: false,
    num: "4",
    title: "Join the community",
    desc: "Discord, Zealy, and X.",
    active: false,
  },
];

const ECOSYSTEM_CARDS = [
  {
    title: "Token Dashboard",
    desc: "Your ADINA, governance, and ecosystem hub.",
    badge: "You are here",
    badgeColor: "#c9b8ff",
    badgeBg: "rgba(139,92,246,.2)",
    badgeBorder: "rgba(139,92,246,.45)",
    cardBg:
      "linear-gradient(155deg,rgba(139,92,246,.14),rgba(255,255,255,.04))",
    cardBorder: "rgba(139,92,246,.3)",
    iconStroke: "#c9b8ff",
    icon: (
      <>
        <rect x="2" y="2" width="7.5" height="7.5" rx="2" stroke="#c9b8ff" strokeWidth="1.7" />
        <rect x="12.5" y="2" width="7.5" height="7.5" rx="2" stroke="#c9b8ff" strokeWidth="1.7" />
        <rect x="2" y="12.5" width="7.5" height="7.5" rx="2" stroke="#c9b8ff" strokeWidth="1.7" />
        <rect x="12.5" y="12.5" width="7.5" height="7.5" rx="2" stroke="#c9b8ff" strokeWidth="1.7" />
      </>
    ),
    iconBg: "rgba(139,92,246,.2)",
    iconBorder: "rgba(139,92,246,.35)",
  },
  {
    title: "Decentralized Employment Marketplace",
    desc: "Web2 hiring sells your data and hides behind algorithms and AI. We keep hiring genuinely human-to-human and peer-to-peer, with trust built into the system rather than sold back to you.",
    badge: "Next",
    badgeColor: "#c9b8ff",
    badgeBg: "rgba(139,92,246,.18)",
    badgeBorder: "rgba(139,92,246,.4)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(139,92,246,.28)",
    iconStroke: "#c9b8ff",
    icon: (
      <>
        <rect x="2.5" y="6" width="17" height="12" rx="2.5" stroke="#c9b8ff" strokeWidth="1.7" />
        <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h3A1.5 1.5 0 0 1 14 4.5V6" stroke="#c9b8ff" strokeWidth="1.7" />
        <path d="M2.5 11h17" stroke="#c9b8ff" strokeWidth="1.7" />
      </>
    ),
    iconBg: "rgba(139,92,246,.16)",
    iconBorder: "rgba(139,92,246,.3)",
  },
  {
    title: "Gig Economy Platform",
    desc: "Peer-to-peer short-term and project work. Clients post gigs, freelancers deliver, and payment settles automatically.",
    badge: "Coming soon",
    badgeColor: "#9a9aae",
    badgeBg: "rgba(255,255,255,.05)",
    badgeBorder: "rgba(255,255,255,.1)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(255,255,255,.1)",
    icon: (
      <path d="M12 2 4.5 12.5H10l-1 7.5L17.5 9H12l0-7Z" stroke="#9a9aae" strokeWidth="1.7" strokeLinejoin="round" />
    ),
    iconBg: "rgba(255,255,255,.05)",
    iconBorder: "rgba(255,255,255,.1)",
  },
  {
    title: "Non-Custodial Wallet",
    desc: "Self-custody your ADINA.",
    badge: "Coming soon",
    badgeColor: "#9a9aae",
    badgeBg: "rgba(255,255,255,.05)",
    badgeBorder: "rgba(255,255,255,.1)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(255,255,255,.1)",
    icon: (
      <>
        <rect x="2.5" y="5" width="17" height="13" rx="2.5" stroke="#9a9aae" strokeWidth="1.7" />
        <path d="M14.5 10.5h4v3h-4a1.5 1.5 0 0 1 0-3Z" stroke="#9a9aae" strokeWidth="1.7" />
      </>
    ),
    iconBg: "rgba(255,255,255,.05)",
    iconBorder: "rgba(255,255,255,.1)",
  },
  {
    title: "Smart Contract Hub",
    desc: "Where the ecosystem's contracts are built, tested, and deployed, fast, secure, and consistent.",
    badge: "Coming soon",
    badgeColor: "#9a9aae",
    badgeBg: "rgba(255,255,255,.05)",
    badgeBorder: "rgba(255,255,255,.1)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(255,255,255,.1)",
    icon: (
      <path d="M7.5 6.5 3 11l4.5 4.5M14.5 6.5 19 11l-4.5 4.5" stroke="#9a9aae" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    ),
    iconBg: "rgba(255,255,255,.05)",
    iconBorder: "rgba(255,255,255,.1)",
  },
  {
    title: "Carbon Credit Trading Platform",
    desc: "Verified carbon credits on-chain: transparent, traceable, and impossible to double-count.",
    badge: "Later",
    badgeColor: "#9a9aae",
    badgeBg: "rgba(255,255,255,.05)",
    badgeBorder: "rgba(255,255,255,.1)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(255,255,255,.1)",
    icon: (
      <>
        <path d="M5 17C5 9.5 11.5 4.5 18 4.5c.3 7.8-5 12.5-13 12.5Z" stroke="#9a9aae" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M6 16c3-4 6.5-6.5 10-8" stroke="#9a9aae" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
    iconBg: "rgba(255,255,255,.05)",
    iconBorder: "rgba(255,255,255,.1)",
  },
  {
    title: "Nutraceuticals Retail Platform",
    desc: "Health and wellness supplements with blockchain-verified origin and traceability, for longevity, immunity, and cognitive performance.",
    badge: "Later",
    badgeColor: "#9a9aae",
    badgeBg: "rgba(255,255,255,.05)",
    badgeBorder: "rgba(255,255,255,.1)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(255,255,255,.1)",
    icon: (
      <>
        <rect x="3" y="8.5" width="16" height="5" rx="2.5" transform="rotate(-45 11 11)" stroke="#9a9aae" strokeWidth="1.7" />
        <path d="M8.3 8.3 13.7 13.7" stroke="#9a9aae" strokeWidth="1.7" />
      </>
    ),
    iconBg: "rgba(255,255,255,.05)",
    iconBorder: "rgba(255,255,255,.1)",
  },
  {
    title: "Performance Racing Team Platform",
    desc: "Fan engagement and telemetry data monetization for the Adina Labs performance racing team — on-chain participation without extracting your identity.",
    badge: "Later",
    badgeColor: "#9a9aae",
    badgeBg: "rgba(255,255,255,.05)",
    badgeBorder: "rgba(255,255,255,.1)",
    cardBg: "rgba(255,255,255,.04)",
    cardBorder: "rgba(255,255,255,.1)",
    icon: (
      <path d="M4 16h3l2-4h6l2 4h3M8 12l1.5-5h5L16 12M9 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="#9a9aae" strokeWidth="1.7" strokeLinejoin="round" />
    ),
    iconBg: "rgba(255,255,255,.05)",
    iconBorder: "rgba(255,255,255,.1)",
  },
];

export function ConnectedDashboard({
  selected,
  voted,
  onSelectOption,
  onCastVote,
  tokenBalanceLabel = "235",
  tokenSymbol = "ADINA",
  balanceIsLive = false,
  portfolioValueLabel = "$39.95",
}: ConnectedDashboardProps) {
  const canVote = selected !== null && !voted;
  const voteBtnLabel = voted ? "Vote submitted" : "Cast vote";
  const voteHint = voted
    ? `Your ${tokenBalanceLabel} votes were recorded.`
    : selected
      ? `Casting ${tokenBalanceLabel} votes.`
      : "Cast your first vote.";

  return (
    <main
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "28px 48px 64px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <section
        id="overview"
        className="dashboard-fade-up"
        style={{
          padding: "22px 26px",
          borderRadius: 18,
          background:
            "linear-gradient(150deg,rgba(139,92,246,.14),rgba(255,255,255,.04))",
          border: "1px solid rgba(139,92,246,.28)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span
              style={{
                flex: "none",
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "rgba(139,92,246,.25)",
                border: "1px solid rgba(139,92,246,.5)",
                color: "#c9b8ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              ✦
            </span>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Welcome to Adina Labs
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#a6a6b8" }}>
                Your window into the ADINA ecosystem. Get set up in a few steps.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 120,
                height: 7,
                borderRadius: 999,
                background: "rgba(255,255,255,.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "25%",
                  height: "100%",
                  background: "linear-gradient(90deg,#8b5cf6,#a78bfa)",
                }}
              />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#c9b8ff" }}>
              1 / 4
            </span>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {ONBOARDING_STEPS.map((step) => (
            <div
              key={step.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 11,
                padding: "14px 15px",
                borderRadius: 13,
                background: step.active
                  ? "rgba(52,211,153,.08)"
                  : "rgba(255,255,255,.04)",
                border: step.active
                  ? "1px solid rgba(52,211,153,.28)"
                  : "1px solid rgba(255,255,255,.1)",
                cursor: step.active ? "default" : "pointer",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: step.active
                    ? "#34d399"
                    : "rgba(255,255,255,.06)",
                  border: step.active
                    ? "none"
                    : "1px solid rgba(255,255,255,.15)",
                  color: step.active ? "#0a0a12" : "#c9b8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {step.num}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: "#f3f3f8",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#8a8a9c",
                    marginTop: 2,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="dashboard-fade-up"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "26px 30px",
          borderRadius: 18,
          background:
            "linear-gradient(150deg,rgba(139,92,246,.16),rgba(255,255,255,.04))",
          border: "1px solid rgba(139,92,246,.28)",
          animationDelay: "0.04s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -70,
            right: -30,
            width: 260,
            height: 260,
            background:
              "radial-gradient(circle,rgba(139,92,246,.38),transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <Image
          src="/dashboard/adina-token.png"
          alt="ADINA token"
          width={150}
          height={150}
          style={{
            position: "absolute",
            top: "50%",
            right: 22,
            transform: "translateY(-50%)",
            width: 150,
            height: 150,
            objectFit: "contain",
            filter: "drop-shadow(0 8px 26px rgba(90,160,255,.35))",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 22,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                color: "#c9b8ff",
              }}
            >
              Your Wallet
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 12,
                fontWeight: 600,
                color: "#c9c9d6",
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#34d399",
                  boxShadow: "0 0 7px #34d399",
                }}
              />
              Ethereum Mainnet
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#8fbcff",
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(90,160,255,.1)",
                border: "1px solid rgba(90,160,255,.25)",
              }}
            >
              Read-only
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#9a9aae",
                  marginBottom: 7,
                }}
              >
                ADINA BALANCE
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 0.9,
                  }}
                >
                  {tokenBalanceLabel}
                </span>
                <span
                  style={{ fontSize: 19, fontWeight: 700, color: "#c9b8ff" }}
                >
                  {tokenSymbol}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "#8a8a9c",
                  fontWeight: 500,
                  marginTop: 9,
                }}
              >
                {balanceIsLive
                  ? "On-chain balance (Base)"
                  : "Preview balance — token not live yet"}
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(255,255,255,.1)",
                marginBottom: 4,
              }}
            />
            <div style={{ marginBottom: 4 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#9a9aae",
                  marginBottom: 6,
                }}
              >
                PORTFOLIO VALUE
              </div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>
                {portfolioValueLabel}
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(255,255,255,.1)",
                marginBottom: 4,
              }}
            />
            <div style={{ marginBottom: 4 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#9a9aae",
                  marginBottom: 6,
                }}
              >
                VOTING POWER
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#c9b8ff" }}>
                {tokenBalanceLabel}{" "}
                <span
                  style={{ fontSize: 14, color: "#8a8a9c", fontWeight: 600 }}
                >
                  votes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="dashboard-fade-up"
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 22,
          alignItems: "start",
          animationDelay: "0.08s",
        }}
      >
        <div
          style={{
            padding: "24px 26px",
            borderRadius: 18,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                color: "#a6a6b8",
              }}
            >
              Supply Composition
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#8a8a9c" }}>
              <span style={{ color: "#34d399", fontWeight: 700 }}>
                88,235,294
              </span>{" "}
              circulating /{" "}
              <span style={{ color: "#f3f3f8", fontWeight: 700 }}>
                1,000,000,000
              </span>{" "}
              max
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div
              style={{
                flex: "none",
                position: "relative",
                width: 140,
                height: 140,
                borderRadius: 999,
                background:
                  "conic-gradient(#34d399 0 8.82%,#a78bfa 8.82% 10.12%,#8b5cf6 10.12% 55.12%,#5a4b8f 55.12% 70.12%,#3d3d52 70.12% 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 24,
                  borderRadius: 999,
                  background: "#101018",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  1B
                </span>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 600,
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    color: "#8a8a9c",
                    marginTop: 2,
                  }}
                >
                  max supply
                </span>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                { color: "#34d399", label: "Public / IDO", pct: "8.82%" },
                { color: "#a78bfa", label: "Liquidity", pct: "1.3%" },
                {
                  color: "#8b5cf6",
                  label: "Ecosystem & Community",
                  pct: "45%",
                },
                {
                  color: "#5a4b8f",
                  label: (
                    <>
                      Team & Advisors{" "}
                      <span style={{ color: "#7e7e95", fontWeight: 500 }}>
                        (vesting)
                      </span>
                    </>
                  ),
                  pct: "15%",
                },
                {
                  color: "#3d3d52",
                  label: "Treasury / Reserve",
                  pct: "29.88%",
                },
              ].map((row) => (
                <div
                  key={typeof row.label === "string" ? row.label : "team"}
                  style={{ display: "flex", alignItems: "center", gap: 9 }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 3,
                      background: row.color,
                      flex: "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#c9c9d6",
                      flex: 1,
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#f3f3f8",
                    }}
                  >
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "24px 26px",
            borderRadius: 18,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".04em",
              textTransform: "uppercase",
              color: "#a6a6b8",
              marginBottom: 18,
            }}
          >
            Token Metrics
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {[
              { label: "ISSUE PRICE FLOOR", value: "$0.17" },
              {
                label: (
                  <>
                    INITIAL FDV{" "}
                    <span style={{ fontWeight: 500, color: "#7e7e95" }}>
                      (@ $0.17)
                    </span>
                  </>
                ),
                value: "$170M",
              },
              { label: "IDO RAISE TARGET", value: "$15,000,000" },
              { label: "TOKEN", value: "ADINA", accent: true },
            ].map((item, i) => (
              <div
                key={i}
                style={{ padding: "15px 16px", background: "#14141f" }}
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
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: item.accent ? "#c9b8ff" : undefined,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="dashboard-fade-up"
        style={{
          animationDelay: "0.06s",
          padding: "24px 26px",
          borderRadius: 18,
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: "rgba(52,211,153,.18)",
              border: "1px solid rgba(52,211,153,.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#34d399",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            ✓
          </span>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
            Canonical Contract Verification
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: "16px 18px",
              borderRadius: 14,
              background: "rgba(52,211,153,.1)",
              border: "1px solid rgba(52,211,153,.3)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "#34d399",
                marginBottom: 8,
              }}
            >
              Official ADINA Contract
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "ui-monospace, Menlo, monospace",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#f3f3f8",
                  wordBreak: "break-all",
                }}
              >
                0xAD1nA0000c0ntract7b3e9f42D6aa10Cf88E00021
              </span>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#34d399",
                  padding: "5px 11px",
                  borderRadius: 999,
                  background: "rgba(52,211,153,.14)",
                  border: "1px solid rgba(52,211,153,.3)",
                }}
              >
                Verified
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#a6a6b8",
                  padding: "5px 11px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.06)",
                }}
              >
                Copy address
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "16px 18px",
              borderRadius: 14,
              background: "rgba(52,211,153,.06)",
              border: "1px solid rgba(52,211,153,.22)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "#34d399",
                marginBottom: 8,
              }}
            >
              Genuine Liquidity Pool
            </div>
            <span
              style={{
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 15,
                fontWeight: 600,
                color: "#f3f3f8",
                wordBreak: "break-all",
              }}
            >
              0xL1qu1d1tyP00l4c2b8Da9930fEE1074aB60c5512
            </span>
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#a6a6b8",
                fontWeight: 500,
              }}
            >
              Pool size{" "}
              <span style={{ color: "#f3f3f8", fontWeight: 700 }}>
                $2,250,000
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 11,
            alignItems: "flex-start",
            padding: "13px 16px",
            borderRadius: 12,
            background: "rgba(246,133,27,.09)",
            border: "1px solid rgba(246,133,27,.32)",
          }}
        >
          <span
            style={{
              flex: "none",
              marginTop: 1,
              color: "#f6b078",
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            ⚠
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.5,
              color: "#f6b078",
              fontWeight: 500,
            }}
          >
            Only interact with the official contract shown here. Adina Labs will
            never publish a different address. Copycat tokens using the ADINA
            name may appear around the IDO. Always verify against this dashboard
            before transacting.
          </p>
        </div>
      </section>

      <section
        id="governance"
        className="dashboard-fade-up"
        style={{
          animationDelay: "0.12s",
          padding: "26px 28px",
          borderRadius: 18,
          background:
            "linear-gradient(160deg,rgba(139,92,246,.1),rgba(255,255,255,.04))",
          border: "1px solid rgba(139,92,246,.24)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 6,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Governance
            </h2>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#c9b8ff",
                padding: "4px 11px",
                borderRadius: 999,
                background: "rgba(139,92,246,.18)",
                border: "1px solid rgba(139,92,246,.35)",
              }}
            >
              1 active proposal
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#a6a6b8", fontWeight: 500 }}>
            Your voting power{" "}
            <span style={{ color: "#c9b8ff", fontWeight: 700 }}>
              235 votes
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "22px 24px",
            borderRadius: 16,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "ui-monospace, Menlo, monospace",
                color: "#8a8a9c",
              }}
            >
              ADINA-GOV-001
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#34d399",
                padding: "3px 9px",
                borderRadius: 999,
                background: "rgba(52,211,153,.12)",
                border: "1px solid rgba(52,211,153,.3)",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#34d399",
                }}
              />
              Voting open
            </span>
            <span
              style={{ fontSize: 12, color: "#8a8a9c", fontWeight: 500 }}
            >
              Closes in 4 days
            </span>
          </div>
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Allocate community treasury toward employment marketplace launch
            incentives
          </h3>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#c9c9d6",
              maxWidth: 760,
            }}
          >
            Direct ecosystem resources toward launch incentives for the
            decentralized employment marketplace. Vote weight is proportional to
            ADINA held at the snapshot block.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: "#a6a6b8" }}>
                  Quorum{" "}
                  <span style={{ color: "#f3f3f8", fontWeight: 700 }}>
                    72%
                  </span>{" "}
                  of 40% required
                </span>
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: "#34d399" }}
                >
                  Quorum met
                </span>
              </div>
              <div
                style={{
                  position: "relative",
                  height: 8,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "40%",
                    top: -2,
                    bottom: -2,
                    width: 2,
                    background: "rgba(255,255,255,.4)",
                  }}
                />
                <div
                  style={{
                    width: "72%",
                    height: "100%",
                    background: "linear-gradient(90deg,#34d399,#5ee0ab)",
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {GOVERNANCE_OPTIONS.map((opt) => {
              const active = selected === opt.key;
              const color = voteOptionColor(opt.key);
              return (
                <div
                  key={opt.key}
                  role="button"
                  tabIndex={voted ? -1 : 0}
                  onClick={() => !voted && onSelectOption(opt.key)}
                  onKeyDown={(e) => {
                    if (!voted && (e.key === "Enter" || e.key === " ")) {
                      onSelectOption(opt.key);
                    }
                  }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: voted ? "default" : "pointer",
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: active
                      ? "rgba(139,92,246,.14)"
                      : "rgba(255,255,255,.04)",
                    border: active
                      ? "1px solid rgba(139,92,246,.5)"
                      : "1px solid rgba(255,255,255,.09)",
                    transition: "all .18s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 14,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                      }}
                    >
                      <span
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 999,
                          border: `2px solid ${active ? "#8b5cf6" : "rgba(255,255,255,.25)"}`,
                          background: active ? "#8b5cf6" : "transparent",
                          boxShadow: active
                            ? "0 0 10px rgba(139,92,246,.6)"
                            : "none",
                          flex: "none",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#f3f3f8",
                        }}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#c9b8ff",
                      }}
                    >
                      {opt.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${opt.pct}%`,
                      background: color,
                      opacity: 0.08,
                      zIndex: 1,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={onCastVote}
              disabled={!canVote}
              style={{
                padding: "12px 26px",
                borderRadius: 999,
                border: "none",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                cursor: canVote ? "pointer" : "not-allowed",
                color: "#fff",
                background: canVote
                  ? "linear-gradient(135deg,#8b5cf6,#7c4ff0)"
                  : "rgba(255,255,255,.08)",
                boxShadow: canVote
                  ? "0 0 24px rgba(139,92,246,.4)"
                  : "none",
                transition: "all .2s ease",
              }}
            >
              {voteBtnLabel}
            </button>
            <span
              style={{ fontSize: 13, color: "#8a8a9c", fontWeight: 500 }}
            >
              {voteHint}
            </span>
          </div>
        </div>
      </section>

      <RoadmapSection />
      <EcosystemSection cards={ECOSYSTEM_CARDS} />
      <TransactionHistorySection />
      <DashboardFooter />
    </main>
  );
}

function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="dashboard-fade-up"
      style={{
        animationDelay: "0.16s",
        padding: "28px 30px",
        borderRadius: 18,
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 26,
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Roadmap
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#8a8a9c" }}>
            What is live today, and the order everything else ships in.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            { color: "#34d399", label: "Live" },
            { color: "#8b5cf6", label: "In progress" },
            { color: "#3d3d52", label: "Planned" },
          ].map((item) => (
            <span
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 12,
                fontWeight: 600,
                color: "#a6a6b8",
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 3,
                  background: item.color,
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 11,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg,#34d399 0%,#34d399 12%,#8b5cf6 12%,#8b5cf6 38%,rgba(255,255,255,.12) 38%,rgba(255,255,255,.12) 100%)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            position: "relative",
          }}
        >
          <RoadmapPhase
            phase="PHASE 1"
            phaseColor="#34d399"
            badge="Live now"
            badgeStyle={{
              color: "#34d399",
              background: "rgba(52,211,153,.12)",
              border: "1px solid rgba(52,211,153,.3)",
            }}
            marker={
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: "#34d399",
                  border: "3px solid #0f0f18",
                  boxShadow: "0 0 0 2px #34d399",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a0a12",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                ✓
              </span>
            }
            period="Q4 2026"
            items={[
              "Genesis Public IDO (Uniswap CCA)",
              "Token Dashboard",
              "Community governance",
            ]}
            itemStyle={{ color: "#34d399", type: "check" as const }}
            textColor="#c9c9d6"
          />
          <RoadmapPhase
            phase="PHASE 2"
            phaseColor="#c9b8ff"
            badge="In progress"
            badgeStyle={{
              color: "#c9b8ff",
              background: "rgba(139,92,246,.16)",
              border: "1px solid rgba(139,92,246,.4)",
            }}
            marker={
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: "#8b5cf6",
                  border: "3px solid #0f0f18",
                  boxShadow: "0 0 0 2px #8b5cf6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "#fff",
                  }}
                />
              </span>
            }
            period="Next"
            items={[
              "Decentralized Employment Marketplace",
              "Non-Custodial Wallet",
              "Staking",
            ]}
            itemStyle={{ color: "#8b5cf6", type: "dot" as const }}
            textColor="#c9c9d6"
          />
          <RoadmapPhase
            phase="PHASE 3"
            phaseColor="#9a9aae"
            badge="Planned"
            badgeStyle={{
              color: "#9a9aae",
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
            marker={
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: "#1a1a26",
                  border: "3px solid #0f0f18",
                  boxShadow: "0 0 0 2px rgba(255,255,255,.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "#7e7e95",
                  }}
                />
              </span>
            }
            period="Later"
            items={[
              "Gig Economy Platform",
              "Smart Contract Hub",
              "On-chain reputation",
            ]}
            itemStyle={{ color: "#3d3d52", type: "dot" as const }}
            textColor="#a6a6b8"
          />
          <RoadmapPhase
            phase="PHASE 4"
            phaseColor="#9a9aae"
            badge="Planned"
            badgeStyle={{
              color: "#9a9aae",
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
            marker={
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: "#1a1a26",
                  border: "3px solid #0f0f18",
                  boxShadow: "0 0 0 2px rgba(255,255,255,.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "#7e7e95",
                  }}
                />
              </span>
            }
            period="Ecosystem expansion"
            items={[
              "Carbon Credit Trading Platform",
              "Nutraceuticals Retail Platform",
              "Performance Racing Team Platform",
            ]}
            itemStyle={{ color: "#3d3d52", type: "dot" as const }}
            textColor="#a6a6b8"
          />
        </div>
      </div>
      <p
        style={{
          margin: "22px 0 0",
          fontSize: 12,
          color: "#7e7e95",
          lineHeight: 1.5,
        }}
      >
        Sequencing is indicative and may adjust with community governance. Phase
        2 features are in development and are not yet live.
      </p>
    </section>
  );
}

type RoadmapPhaseProps = {
  phase: string;
  phaseColor: string;
  badge: string;
  badgeStyle: React.CSSProperties;
  marker: React.ReactNode;
  period: string;
  items: string[];
  itemStyle: { color: string; type: "check" | "dot" };
  textColor: string;
};

function RoadmapPhase({
  phase,
  phaseColor,
  badge,
  badgeStyle,
  marker,
  period,
  items,
  itemStyle,
  textColor,
}: RoadmapPhaseProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          marginBottom: 18,
        }}
      >
        {marker}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "ui-monospace, Menlo, monospace",
            color: phaseColor,
          }}
        >
          {phase}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 999,
            ...badgeStyle,
          }}
        >
          {badge}
        </span>
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#8a8a9c",
          marginBottom: 12,
        }}
      >
        {period}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontSize: 13.5,
              fontWeight: 600,
              color: textColor,
            }}
          >
            {itemStyle.type === "check" ? (
              <span style={{ color: itemStyle.color, fontSize: 12 }}>✓</span>
            ) : (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: itemStyle.color,
                }}
              />
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

type EcosystemCard = (typeof ECOSYSTEM_CARDS)[number];

function EcosystemSection({ cards }: { cards: EcosystemCard[] }) {
  return (
    <section id="ecosystem" className="dashboard-fade-up" style={{ animationDelay: "0.18s" }}>
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Ecosystem
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: "#8a8a9c" }}>
          Every Adina Labs platform, in one place.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              position: "relative",
              padding: 20,
              borderRadius: 16,
              background: card.cardBg,
              border: `1px solid ${card.cardBorder}`,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                fontSize: 11,
                fontWeight: 700,
                color: card.badgeColor,
                padding: "4px 10px",
                borderRadius: 999,
                background: card.badgeBg,
                border: `1px solid ${card.badgeBorder}`,
              }}
            >
              {card.badge}
            </span>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                background: card.iconBg,
                border: `1px solid ${card.iconBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {card.icon}
              </svg>
            </div>
            <h3
              style={{
                margin: "0 0 6px",
                fontSize: 16,
                fontWeight: 700,
                color: "#f3f3f8",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.55,
                color: "#a6a6b8",
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TransactionHistorySection() {
  return (
    <section
      className="dashboard-fade-up"
      style={{
        animationDelay: "0.24s",
        padding: "24px 26px",
        borderRadius: 18,
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Transaction History
        </h2>
      </div>
      <div
        style={{
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 12,
            padding: "11px 18px",
            background: "rgba(255,255,255,.03)",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".04em",
            textTransform: "uppercase",
            color: "#7e7e95",
          }}
        >
          <span>Type</span>
          <span>Amount</span>
          <span>Date</span>
          <span style={{ textAlign: "right" }}>Tx Hash</span>
        </div>
        {TRANSACTIONS.map((tx) => (
          <div
            key={tx.hash}
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
              gap: 12,
              padding: "14px 18px",
              borderBottom: "1px solid rgba(255,255,255,.05)",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  flex: "none",
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#c9b8ff",
                  background: "rgba(139,92,246,.14)",
                  border: "1px solid rgba(139,92,246,.28)",
                }}
              >
                {tx.icon}
              </span>
              <span
                style={{ fontSize: 14, fontWeight: 600, color: "#f3f3f8" }}
              >
                {tx.type}
              </span>
            </div>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: tx.up ? "#34d399" : "#c9c9d6",
              }}
            >
              {tx.amount}
            </span>
            <span style={{ fontSize: 14, color: "#a6a6b8" }}>{tx.date}</span>
            <span
              style={{
                textAlign: "right",
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 13,
                color: "#8fbcff",
              }}
            >
              {tx.hash}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function DashboardFooter() {
  return (
    <footer
      id="docs"
      style={{
        marginTop: 14,
        paddingTop: 26,
        borderTop: "1px solid rgba(255,255,255,.08)",
        scrollMarginTop: 88,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 340 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <Image
              src="/dashboard/logo.png"
              alt="Adina Labs"
              width={30}
              height={30}
              style={{ width: 30, height: 30, objectFit: "contain" }}
            />
            <span style={{ fontWeight: 800, fontSize: 16 }}>Adina Labs</span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: "#8a8a9c",
            }}
          >
            A read-only hub for the ADINA community. Platform surfaces link out
            from here as they go live.
          </p>
        </div>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "#7e7e95",
                marginBottom: 12,
              }}
            >
              Resources
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 9 }}
            >
              <a style={{ fontSize: 14, fontWeight: 500 }} href="#">
                Documentation
              </a>
              <a style={{ fontSize: 14, fontWeight: 500 }} href="#">
                Whitepaper
              </a>
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "#7e7e95",
                marginBottom: 12,
              }}
            >
              Community
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {[
                {
                  href: "https://discord.gg/AJg6e4z7M",
                  label: "Discord",
                },
                {
                  href: "https://zealy.io/cw/adinalabs/questboard",
                  label: "Zealy",
                },
                { href: "https://x.com/adinalabs", label: "X" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#c9c9d6",
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 28,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,.06)",
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
          }}
        >
          The Adina Labs Dashboard is a non-custodial, read-only interface. It
          displays information about a user&apos;s connected wallet, the ADINA
          token, governance, staking, and platform activity. It does not hold,
          transmit, exchange, or process any value. All transactional actions
          are executed by the user&apos;s own wallet or clearly identified
          third-party providers.
        </p>
      </div>
    </footer>
  );
}
