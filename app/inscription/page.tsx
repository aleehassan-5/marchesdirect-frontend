"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { register, AuthError } from "@/lib/authClient";

const TOTAL_STEPS = 3;

const RADIUS_VALUES = ["25", "50", "100", "national"];

export default function SignupPage() {
  const t = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [trade, setTrade] = useState("Gros oeuvre");
  const [region, setRegion] = useState("");
  const [radius, setRadius] = useState(RADIUS_VALUES[1]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepLabels = [t("onboarding_step_company"), t("onboarding_step_location"), t("onboarding_step_account")];

  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      next();
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await register({
        companyName,
        firstName,
        lastName,
        email,
        password,
        industry: trade,
        region: region || undefined,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof AuthError ? err.message : t("signup_error_generic"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[460px] mx-auto px-5 py-10 md:py-16">
        <div className="eyebrow mb-4">{t("signup_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[26px] md:text-[28px] tracking-tight mb-2">{t("signup_title")}</h1>
        <p className="text-ink-soft text-[14.5px] mb-6">{t("signup_sub")}</p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-1.5">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex-1 h-1.5 rounded-full overflow-hidden bg-border-soft">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: i <= step ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>
        <p className="text-ink-faint text-[12px] font-mono mb-6">
          {t("onboarding_step_of", { step: step + 1, total: TOTAL_STEPS })} &middot; {stepLabels[step]}
        </p>

        <form className="card p-6 flex flex-col gap-4" onSubmit={onSubmit}>
          {error && (
            <div className="text-[13px] text-danger bg-danger/10 border border-danger/30 rounded-[10px] px-3.5 py-2.5">
              {error}
            </div>
          )}

          {step === 0 && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_company")}</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_trade")}</label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                >
                  <option>Gros oeuvre</option>
                  <option>Electricite</option>
                  <option>Plomberie / CVC</option>
                  <option>Peinture / Finitions</option>
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-ink-soft text-[13px] -mt-1 mb-1">{t("onboarding_location_sub")}</p>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("onboarding_location")}</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder={t("onboarding_location_placeholder")}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("onboarding_radius")}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["onboarding_radius_25", "onboarding_radius_50", "onboarding_radius_100", "onboarding_radius_national"] as const).map(
                    (key, i) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 border border-border rounded-[10px] px-3.5 py-2.5 text-[14px] cursor-pointer has-[:checked]:border-gold has-[:checked]:text-gold"
                      >
                        <input
                          type="radio"
                          name="radius"
                          checked={radius === RADIUS_VALUES[i]}
                          onChange={() => setRadius(RADIUS_VALUES[i])}
                          className="accent-[var(--gold)]"
                        />
                        {t(key)}
                      </label>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold">{t("signup_firstname")}</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold">{t("signup_lastname")}</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_email")}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_password")}</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
            </>
          )}

          <div className="flex gap-2.5 mt-2">
            {step > 0 && (
              <button type="button" onClick={back} className="btn btn-ghost flex-1">
                {t("onboarding_back")}
              </button>
            )}
            <button type="submit" disabled={submitting} className="btn btn-gold flex-1 disabled:opacity-60">
              {step < TOTAL_STEPS - 1 ? t("onboarding_continue") : submitting ? t("signup_submitting") : t("signup_submit")}
            </button>
          </div>
        </form>

        <p className="text-[13.5px] text-ink-soft mt-5 text-center">
          {t("signup_have_account")} <Link href="/connexion" className="text-gold font-semibold">{t("nav_login")}</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
