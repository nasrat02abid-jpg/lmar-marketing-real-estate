import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LMAR Marketing | Property with Perspective",
  description: "Explore verified real estate projects, compare opportunities and plan your investment with LMAR Marketing.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
