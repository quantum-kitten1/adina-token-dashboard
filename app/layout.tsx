import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Web3Provider } from "@/components/providers/web3-provider";
import "./globals.css";
import "./dashboard.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADINA Token Dashboard | Adina Labs",
  description:
    "A non-custodial, read-only dashboard for ADINA token holders. View wallet balance, governance, ecosystem roadmap, and activity.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie");

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a12]">
        <Web3Provider cookies={cookies}>{children}</Web3Provider>
      </body>
    </html>
  );
}
