"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "md_saved_listings";
const EVENT_NAME = "md_saved_change";

export function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleSaved(id: string): string[] {
  const current = readSaved();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT_NAME));
  return next;
}

/** Tracks whether a listing id is bookmarked, kept in sync across every component that uses it. */
export function useSaved(id: string) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const update = () => setSaved(readSaved().includes(id));
    update();
    window.addEventListener(EVENT_NAME, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVENT_NAME, update);
      window.removeEventListener("storage", update);
    };
  }, [id]);

  const toggle = useCallback(() => {
    setSaved(toggleSaved(id).includes(id));
  }, [id]);

  return [saved, toggle] as const;
}
