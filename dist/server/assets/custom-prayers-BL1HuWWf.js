import { useState, useEffect, useCallback } from "react";
const KEY$1 = "lucerna-favorites";
const EVT$1 = "lucerna-favorites-changed";
function read$1() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY$1) || "[]");
  } catch {
    return [];
  }
}
function write$1(ids) {
  localStorage.setItem(KEY$1, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVT$1));
}
function useFavorites() {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    setIds(read$1());
    const onChange = () => setIds(read$1());
    window.addEventListener(EVT$1, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT$1, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  const isFavorite = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback((id) => {
    const current = read$1();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    write$1(next);
  }, []);
  return { favorites: ids, isFavorite, toggle };
}
const KEY = "lucerna-custom-prayers";
const EVT = "lucerna-custom-prayers-changed";
function normalize(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => {
    if (!item || typeof item !== "object") return false;
    const maybePrayer = item;
    return typeof maybePrayer.id === "string" && maybePrayer.id.startsWith("custom-") && typeof maybePrayer.title === "string" && typeof maybePrayer.text === "string" && maybePrayer.category === "Custom" && typeof maybePrayer.createdAt === "string";
  });
}
function read() {
  if (typeof window === "undefined") return [];
  try {
    return normalize(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return [];
  }
}
function write(prayers) {
  localStorage.setItem(KEY, JSON.stringify(prayers));
  window.dispatchEvent(new Event(EVT));
}
function slugify(title) {
  const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "prayer";
}
function createId(title) {
  const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8) : `${Date.now()}`;
  return `custom-${slugify(title)}-${suffix}`;
}
function useCustomPrayers() {
  const [customPrayers, setCustomPrayers] = useState([]);
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
  const addCustomPrayer = useCallback((input) => {
    const nextPrayer = {
      id: createId(input.title),
      title: input.title.trim(),
      category: "Custom",
      text: input.text.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    write([nextPrayer, ...read()]);
    return nextPrayer;
  }, []);
  const removeCustomPrayer = useCallback((id) => {
    write(read().filter((prayer) => prayer.id !== id));
  }, []);
  return { customPrayers, ready, addCustomPrayer, removeCustomPrayer };
}
export {
  useFavorites as a,
  useCustomPrayers as u
};
