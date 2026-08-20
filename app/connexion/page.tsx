"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { login, AuthError } from "@/lib/authClient";

export default function LoginPage() {
  const t = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof AuthError ? err.message : t("login_error_generic"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[420px] mx-auto px-5 py-16">
        <h1 className="font-display font-extrabold text-[28px] tracking-tight mb-2">{t("login_title")}</h1>
        <p className="text-ink-soft text-[14.5px] mb-8">{t("login_sub")}</p>

        <form className="card p-6 flex flex-col gap-4" onSubmit={onSubmit}>
          {error && (
            <div className="text-[13px] text-danger bg-danger/10 border border-danger/30 rounded-[10px] px-3.5 py-2.5">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold">{t("login_email")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold">{t("login_password")}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn btn-gold mt-2 disabled:opacity-60">
            {submitting ? t("login_submitting") : t("login_submit")}
          </button>
        </form>

        <p className="text-[13.5px] text-ink-soft mt-5 text-center">
          {t("login_no_account")} <Link href="/inscription" className="text-gold font-semibold">{t("nav_trial")}</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
