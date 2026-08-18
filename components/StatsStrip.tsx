"use client";

import { useTranslation } from "@/lib/i18n";

export function StatsStrip() {
  const t = useTranslation();
  const stats = [
    { value: "12+", label: t("stat_sources") },
    { value: "2-6h", label: t("stat_frequency") },
    { value: "90%", label: t("stat_accuracy") },
    { value: "0", label: t("stat_invented") },
  ];

  return (
    <div className="border-y border-border-soft py-7 grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((s) => (
        <div key={s.label}>
          <b className="block font-display font-extrabold text-[clamp(20px,3vw,26px)] text-gold">{s.value}</b>
          <span className="text-[12.5px] text-ink-soft">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
