import { useState, useEffect, useCallback } from "react";
const KEY = "lucerna-favorites";
const EVT = "lucerna-favorites-changed";
function read() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVT));
}
function useFavorites() {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    setIds(read());
    const onChange = () => setIds(read());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  const isFavorite = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback((id) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    write(next);
  }, []);
  return { favorites: ids, isFavorite, toggle };
}
export {
  useFavorites as u
};
