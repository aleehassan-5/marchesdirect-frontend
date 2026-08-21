import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { Chatbot } from "@/components/Chatbot";
import { MobileActionBar } from "@/components/MobileActionBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "MarchesDirect - Appels d'offres, marches publics et sous-traitance BTP",
  description:
    "Trois flux d'opportunites BTP classes et recommandes automatiquement pour votre metier et votre rayon d'action.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Chatbot />
            <MobileActionBar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
