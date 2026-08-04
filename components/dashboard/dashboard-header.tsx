"use client";

import Image from "next/image";

type DashboardHeaderProps = {
  connected: boolean;
  address: string;
  onOpenModal: () => void;
  onDisconnect: () => void;
  onNavigate: (id: string) => void;
};

const DOCS_URL = "https://adinalabs-website-july-2026.vercel.app/docs";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", weight: 600 },
  { id: "governance", label: "Governance", weight: 500 },
  { id: "roadmap", label: "Roadmap", weight: 500 },
  { id: "ecosystem", label: "Ecosystem", weight: 500 },
  { id: "docs", label: "Docs", weight: 500, href: DOCS_URL },
] as const;

export function DashboardHeader({
  connected,
  address,
  onOpenModal,
  onDisconnect,
  onNavigate,
}: DashboardHeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(10,10,18,.72)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "15px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src="/dashboard/logo.png"
            alt="Adina Labs"
            width={38}
            height={38}
            style={{
              width: 38,
              height: 38,
              objectFit: "contain",
              filter: "drop-shadow(0 0 14px rgba(90,160,255,.45))",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.05,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 17,
                letterSpacing: "-0.02em",
              }}
            >
              Adina Labs
            </span>
            <span
              style={{
                fontWeight: 500,
                fontSize: 11,
                color: "#8a8a9c",
                letterSpacing: ".02em",
              }}
            >
              TOKEN DASHBOARD
            </span>
          </div>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV_ITEMS.map((item) => {
            const external = "href" in item && item.href;
            return (
              <a
                key={item.id}
                href={external ? item.href : `#${item.id}`}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {
                      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        onNavigate(item.id);
                      },
                    })}
                style={{
                  fontSize: 14,
                  fontWeight: item.weight,
                  color: "#c9c9d6",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {connected ? (
          <div
            role="button"
            tabIndex={0}
            onClick={onDisconnect}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onDisconnect();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 8px 7px 14px",
              borderRadius: 999,
              background: "rgba(52,211,153,.1)",
              border: "1px solid rgba(52,211,153,.28)",
              cursor: "pointer",
            }}
          >
            <span
              className="dashboard-pulse-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#34d399",
                boxShadow: "0 0 8px #34d399",
              }}
            />
            <span
              style={{ fontSize: 13, fontWeight: 600, color: "#a6a6b8" }}
            >
              Connected
            </span>
            <span
              style={{
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 13,
                fontWeight: 600,
                color: "#f3f3f8",
                padding: "5px 11px",
                borderRadius: 999,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {address}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#fff",
              background: "linear-gradient(135deg,#8b5cf6,#7c4ff0)",
              boxShadow: "0 0 22px rgba(139,92,246,.4)",
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
