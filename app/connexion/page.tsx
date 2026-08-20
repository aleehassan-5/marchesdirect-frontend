"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";

export default function LoginPage() {
  const t = useTranslation();

  return (
    <>
      <Header />
      <div className="max-w-[420px] mx-auto px-5 py-16">
        <h1 className="font-display font-extrabold text-[28px] tracking-tight mb-2">{t("login_title")}</h1>
        <p className="text-ink-soft text-[14.5px] mb-8">{t("login_sub")}</p>

        <form className="card p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold">{t("login_email")}</label>
            <input type="email" className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold">{t("login_password")}</label>
            <input type="password" className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold" />
          </div>
          <button className="btn btn-gold mt-2">{t("login_submit")}</button>
        </form>

        <p className="text-[13.5px] text-ink-soft mt-5 text-center">
          {t("login_no_account")} <Link href="/inscription" className="text-gold font-semibold">{t("nav_trial")}</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
