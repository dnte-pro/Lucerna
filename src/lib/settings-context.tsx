import React, { createContext, useContext, useEffect, useState } from "react";
const { ReactNode } = React;

export type Theme = "light" | "dark";
export type FontFamily = "serif" | "sans" | "modern";
export type FontSize = "sm" | "md" | "lg" | "xl";

interface Settings {
  theme: Theme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  setTheme: (t: Theme) => void;
  setFontFamily: (f: FontFamily) => void;
  setFontSize: (s: FontSize) => void;
}

const SettingsContext = createContext<Settings | null>(null);

const FAMILY_MAP: Record<FontFamily, { serif: string; sans: string }> = {
  serif: {
    serif: '"Libre Baskerville", Georgia, serif',
    sans: '"IBM Plex Sans", system-ui, sans-serif',
  },
  sans: {
    serif: '"IBM Plex Sans", system-ui, sans-serif',
    sans: '"IBM Plex Sans", system-ui, sans-serif',
  },
  modern: {
    serif: '"IBM Plex Serif", Georgia, serif',
    sans: '"Inter", system-ui, sans-serif',
  },
};

const SIZE_MAP: Record<FontSize, string> = {
  sm: "0.9",
  md: "1",
  lg: "1.15",
  xl: "1.3",
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [fontFamily, setFamilyState] = useState<FontFamily>("serif");
  const [fontSize, setSizeState] = useState<FontSize>("md");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lumen-settings");
      if (raw) {
        const s = JSON.parse(raw);
        if (s.theme) setThemeState(s.theme);
        if (s.fontFamily) setFamilyState(s.fontFamily);
        if (s.fontSize) setSizeState(s.fontSize);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    const f = FAMILY_MAP[fontFamily];
    root.style.setProperty("--font-serif-family", f.serif);
    root.style.setProperty("--font-sans-family", f.sans);
    root.style.setProperty("--font-scale", SIZE_MAP[fontSize]);
    try {
      localStorage.setItem(
        "lumen-settings",
        JSON.stringify({ theme, fontFamily, fontSize }),
      );
    } catch {}
  }, [theme, fontFamily, fontSize]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        fontFamily,
        fontSize,
        setTheme: setThemeState,
        setFontFamily: setFamilyState,
        setFontSize: setSizeState,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}