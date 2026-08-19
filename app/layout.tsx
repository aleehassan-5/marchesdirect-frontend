import type { Metadata, Viewport } from "next";
import { Oswald, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MARCHÉS/DIRECT — Les marchés viennent à vous",
  description:
    "Appels d'offres privés, marchés publics et sous-traitance, sélectionnés selon votre métier et votre zone.",
};

// Locks pinch-zoom scaling so the layout renders at the same visual size on
// every device instead of the browser trying to "fit" it differently.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <body className="overflow-x-hidden bg-brand">
        {/*
          Single fixed-width "app" frame. It fills the screen on phones and
          sits centered with a visible edge on wider screens — but the
          content inside never changes shape or hides/reveals anything based
          on viewport size, so the view is identical everywhere.
        */}
        <div className="relative mx-auto min-h-screen w-full max-w-[520px] overflow-x-hidden border-x border-border bg-canvas">
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  );
}
