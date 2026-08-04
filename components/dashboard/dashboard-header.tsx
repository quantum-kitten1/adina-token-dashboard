"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = useCallback(
    (id: string) => {
      setMenuOpen(false);
      onNavigate(id);
    },
    [onNavigate],
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_ITEMS)[number],
  ) => {
    const external = "href" in item && item.href;
    if (external) {
      setMenuOpen(false);
      return;
    }
    e.preventDefault();
    handleNavigate(item.id);
  };

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
      <div className="dashboard-header-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <Image
            src="/dashboard/logo.png"
            alt="Adina Labs"
            width={38}
            height={38}
            style={{
              width: 38,
              height: 38,
              flexShrink: 0,
              objectFit: "contain",
              filter: "drop-shadow(0 0 14px rgba(90,160,255,.45))",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.05,
              minWidth: 0,
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

        <nav className="dashboard-header-nav" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const external = "href" in item && item.href;
            return (
              <a
                key={item.id}
                href={external ? item.href : `#${item.id}`}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {
                      onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
                        handleNavClick(e, item),
                    })}
                style={{
                  fontSize: 14,
                  fontWeight: item.weight,
                  color: "#c9c9d6",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="dashboard-header-actions">
          <button
            type="button"
            className="dashboard-header-menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {connected ? (
            <div
              role="button"
              tabIndex={0}
              className="dashboard-wallet-pill"
              onClick={onDisconnect}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onDisconnect();
              }}
            >
              <span
                className="dashboard-pulse-dot"
                style={{
                  flexShrink: 0,
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                }}
              />
              <span
                className="dashboard-wallet-status-label"
                style={{ fontSize: 13, fontWeight: 600, color: "#a6a6b8" }}
              >
                Connected
              </span>
              <span className="dashboard-wallet-address">{address}</span>
            </div>
          ) : (
            <button
              type="button"
              className="dashboard-connect-btn"
              onClick={onOpenModal}
            >
              <span className="dashboard-connect-label-long">Connect Wallet</span>
              <span>Connect</span>
            </button>
          )}
        </div>
      </div>

      <nav
        className={`dashboard-header-mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {NAV_ITEMS.map((item) => {
          const external = "href" in item && item.href;
          return (
            <a
              key={item.id}
              href={external ? item.href : `#${item.id}`}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {
                    onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
                      handleNavClick(e, item),
                  })}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
