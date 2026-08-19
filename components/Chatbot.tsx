"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

export function Chatbot() {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: t("chat_intro") },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((m) => [
      ...m,
      { from: "user", text: question },
      { from: "bot", text: t("chat_fallback") },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-[84px] right-4 md:bottom-5 md:right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[calc(100vw-32px)] max-w-[360px] h-[440px] card shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border-soft flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-[14.5px]">{t("chat_title")}</p>
              <p
                className="text-[11px] text-ink-faint font-mono"
                dangerouslySetInnerHTML={{ __html: t("chat_tagline") }}
              />
            </div>
            <button onClick={() => setOpen(false)} className="text-ink-faint hover:text-ink text-[18px] leading-none">
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-[13.5px] leading-relaxed px-3 py-2 rounded-[10px] max-w-[85%] ${
                  m.from === "bot" ? "bg-bg-elevated-2 self-start" : "bg-gold text-gold-ink self-end"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border-soft flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t("chat_placeholder")}
              className="flex-1 bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px] outline-none focus:border-gold"
            />
            <button onClick={send} className="btn btn-gold px-4">
              {t("chat_send")}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-[52px] h-[52px] rounded-full bg-gold text-gold-ink flex items-center justify-center shadow-2xl ring-4 ring-bg hover:bg-gold-strong transition-colors"
        aria-label={t("chat_open")}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      </button>
    </div>
  );
}
