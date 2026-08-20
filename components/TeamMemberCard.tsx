"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

export function TeamMemberCard({
  name,
  role,
  photo,
  videoUrl,
}: {
  name: string;
  role: string;
  photo: string;
  videoUrl: string;
}) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(videoUrl);

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <button
          onClick={() => hasVideo && setOpen(true)}
          disabled={!hasVideo}
          className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden border-2 border-gold shrink-0 disabled:cursor-default"
          aria-label={hasVideo ? `${t("about_video_intro")} - ${name}` : name}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-bg-elevated-2 flex items-center justify-center text-[28px] font-display font-bold text-ink-faint">
              {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
          )}
        </button>
        <span className="text-gold font-display font-bold text-[13.5px] mt-4">{role}</span>
        <span className="text-[15px] mt-1">{name}</span>
        {hasVideo && (
          <button
            onClick={() => setOpen(true)}
            className="btn btn-ghost mt-3 py-1.5 px-3.5 text-[12.5px]"
          >
            {t("about_video_intro")}
          </button>
        )}
      </div>

      {open && hasVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[520px] card p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={t("about_video_close") as string}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gold text-gold-ink flex items-center justify-center shadow-lg"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <video src={videoUrl} controls autoPlay className="w-full rounded-[6px] block" />
          </div>
        </div>
      )}
    </>
  );
}
