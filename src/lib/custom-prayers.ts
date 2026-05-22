import { useCallback, useEffect, useState } from "react";
import type { Prayer } from "@/lib/prayers-data";

const KEY = "lucerna-custom-prayers";
const EVT = "lucerna-custom-prayers-changed";

export interface CustomPrayer extends Prayer {
  category: "Custom";
  createdAt: string;
}

export interface CustomPrayerInput {
  title: string;
  text: string;
}

function normalize(value: unknown): CustomPrayer[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is CustomPrayer => {
    if (!item || typeof item !== "object") return false;
    const maybePrayer = item as Partial<CustomPrayer>;
    return (
      typeof maybePrayer.id === "string" &&
      maybePrayer.id.startsWith("custom-") &&
      typeof maybePrayer.title === "string" &&
      typeof maybePrayer.text === "string" &&
      maybePrayer.category === "Custom" &&
      typeof maybePrayer.createdAt === "string"
    );
  });
}

function read(): CustomPrayer[] {
  if (typeof window === "undefined") return [];
  try {
    return normalize(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return [];
  }
}

function write(prayers: CustomPrayer[]) {
  localStorage.setItem(KEY, JSON.stringify(prayers));
  window.dispatchEvent(new Event(EVT));
}

function slugify(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "prayer";
}

function createId(title: string) {
  const suffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : `${Date.now()}`;

  return `custom-${slugify(title)}-${suffix}`;
}

export function useCustomPrayers() {
  const [customPrayers, setCustomPrayers] = useState<CustomPrayer[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCustomPrayers(read());
    setReady(true);

    const onChange = () => setCustomPrayers(read());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const addCustomPrayer = useCallback((input: CustomPrayerInput) => {
    const nextPrayer: CustomPrayer = {
      id: createId(input.title),
      title: input.title.trim(),
      category: "Custom",
      text: input.text.trim(),
      createdAt: new Date().toISOString(),
    };

    write([nextPrayer, ...read()]);
    return nextPrayer;
  }, []);

  const removeCustomPrayer = useCallback((id: string) => {
    write(read().filter((prayer) => prayer.id !== id));
  }, []);

  return { customPrayers, ready, addCustomPrayer, removeCustomPrayer };
}

export function getCustomPrayer(id: string) {
  return read().find((p) => p.id === id);
}
