import type { Metadata } from "next";
import { Dela_Gothic_One, M_PLUS_Rounded_1c, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import KonamiEgg from "@/components/KonamiEgg";

const display = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = M_PLUS_Rounded_1c({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "manya pradeep narayan",
  description: "cs + ai student at cornell. interested in agentic systems, human-ai interaction, and what makes software feel reliable, useful, and personal.",
  openGraph: {
    type: "website",
    siteName: "manya pradeep narayan",
    title: "manya pradeep narayan",
    description: "cs + ai student at cornell. interested in agentic systems, human-ai interaction, and what makes software feel reliable, useful, and personal.",
  },
  twitter: {
    card: "summary",
    title: "manya pradeep narayan",
    description: "cs + ai student at cornell. into agentic systems and software that feels personal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <ScrollProgress />
        <Nav />
        <main>{children}</main>
        <KonamiEgg />
      </body>
    </html>
  );
}
