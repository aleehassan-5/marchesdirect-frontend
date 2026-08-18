"use client";

import { useTranslation } from "@/lib/i18n";

export function HowItWorks() {
  const t = useTranslation();
  const steps = [
    { num: "01", title: t("how_1_title"), body: t("how_1_body") },
    { num: "02", title: t("how_2_title"), body: t("how_2_body") },
    { num: "03", title: t("how_3_title"), body: t("how_3_body") },
  ];

  return (
    <section className="py-14" id="how">
      <div className="mb-7">
        <h2 className="font-display font-extrabold text-[clamp(22px,3.4vw,30px)] tracking-tight">{t("how_title")}</h2>
        <p className="text-ink-soft mt-2 text-[15px] max-w-[52ch]">{t("how_sub")}</p>
      </div>
      <div className="border-t border-border-soft">
        {steps.map((s) => (
          <div key={s.num} className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_1fr] gap-4 py-6 border-b border-border-soft items-center">
            <div className="font-mono text-[13px] text-gold font-semibold">{s.num}</div>
            <div>
              <h4 className="font-display font-bold text-[17px] mb-1.5">{s.title}</h4>
            </div>
            <p className="text-ink-soft text-[14px] leading-relaxed max-w-[46ch]">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
