import type { Metadata } from "next";
import { Libre_Franklin, Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { Chatbot } from "@/components/Chatbot";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "MarchesDirect - Appels d'offres, marches publics et sous-traitance BTP",
  description:
    "Trois flux d'opportunites BTP classes et recommandes automatiquement pour votre metier et votre rayon d'action.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark" className={`${libreFranklin.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="pb-[64px] md:pb-0">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Chatbot />
            <MobileBottomNav />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
