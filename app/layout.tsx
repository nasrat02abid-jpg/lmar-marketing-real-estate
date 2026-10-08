import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lmar-marketing-real-estate.nasrat02abid.chatgpt.site"),
  title: {
    default: "LMAR Marketing | Property with Perspective",
    template: "%s | LMAR Marketing",
  },
  description: "Explore verified real estate projects, compare opportunities and plan your investment with LMAR Marketing.",
  keywords: ["LMAR Marketing", "property in Peshawar", "property in Islamabad", "DHA Peshawar", "Regi Model Town", "Faisal Town", "real estate Pakistan"],
  authors: [{ name: "LMAR Marketing" }],
  creator: "LMAR Marketing",
  publisher: "LMAR Marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: "LMAR Marketing",
    title: "LMAR Marketing | Property with Perspective",
    description: "Explore real estate opportunities, price guides and payment plans across Peshawar and Islamabad.",
    images: [{ url: "/lmar-hero.jpg", width: 1200, height: 630, alt: "LMAR Marketing real estate projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LMAR Marketing | Property with Perspective",
    description: "Explore real estate opportunities across Peshawar and Islamabad.",
    images: ["/lmar-hero.jpg"],
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
    <html lang="en-PK">
      <body className="antialiased">{children}</body>
    </html>
  );
}
