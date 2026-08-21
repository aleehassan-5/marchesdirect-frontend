"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation, useLanguage } from "@/lib/i18n";

const plansByLang = {
  fr: [
    {
      name: "Decouverte",
      price: "0 EUR",
      period: "14 jours d'essai",
      features: ["1 metier suivi", "Alertes par email", "Recherche et filtres", "Support par email"],
      cta: "Essayer gratuitement",
      highlight: false,
    },
    {
      name: "Pro",
      price: "89 EUR",
      period: "/ mois",
      features: [
        "Metiers et journeys illimites",
        "Matching et resume IA",
        "Chatbot IA",
        "Module reponse aux appels d'offres",
        "Profil entreprise et coffre-fort documentaire",
      ],
      cta: "Demander un rappel",
      highlight: true,
    },
    {
      name: "Entreprise",
      price: "Sur devis",
      period: "plusieurs utilisateurs",
      features: ["Comptes multi-utilisateurs", "Export CRM dedie", "Accompagnement dedie", "MFA et roles avances"],
      cta: "Etre rappele",
      highlight: false,
    },
  ],
  en: [
    {
      name: "Starter",
      price: "€0",
      period: "14-day trial",
      features: ["1 trade tracked", "Email alerts", "Search and filters", "Email support"],
      cta: "Try for free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "€89",
      period: "/ month",
      features: [
        "Unlimited trades and journeys",
        "AI matching and summaries",
        "AI chatbot",
        "Tender-response module",
        "Company profile and document vault",
      ],
      cta: "Request a callback",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom quote",
      period: "multiple users",
      features: ["Multi-user accounts", "Dedicated CRM export", "Dedicated support", "MFA and advanced roles"],
      cta: "Request a callback",
      highlight: false,
    },
  ],
};

export default function PricingPage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const plans = plansByLang[lang];

  return (
    <>
      <Header />
      <div className="max-w-[1100px] mx-auto px-5 py-14">
        <div className="eyebrow mb-4">{t("pricing_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(26px,4.4vw,40px)] tracking-tight max-w-[18ch]">
          {t("pricing_title")}
        </h1>
        <p className="text-ink-soft mt-3 max-w-[54ch]">{t("pricing_sub")}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className="card p-6 flex flex-col"
              style={p.highlight ? { borderColor: "var(--gold)", borderWidth: 2 } : undefined}
            >
              {p.highlight && (
                <span className="text-[11px] font-mono font-semibold text-gold uppercase tracking-wide mb-2">
                  {t("pricing_highlight")}
                </span>
              )}
              <h3 className="font-display font-bold text-[19px] mb-1">{p.name}</h3>
              <div className="mb-4">
                <span className="font-display font-extrabold text-[28px]">{p.price}</span>
                <span className="text-ink-soft text-[13px] ml-1">{p.period}</span>
              </div>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="text-[13.5px] text-ink-soft flex items-start gap-2">
                    <span className="text-gold">&#10003;</span>{f}
                  </li>
                ))}
              </ul>
              <Link
                href={/rappel|callback/i.test(p.cta) ? "/contact" : "/inscription"}
                className={`btn ${p.highlight ? "btn-gold" : "btn-ghost"}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
