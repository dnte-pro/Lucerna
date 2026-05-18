import { Settings as SettingsIcon, Sun, Moon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/settings-context";
import type { FontFamily, FontSize } from "@/lib/settings-context";
import { Label } from "@/components/ui/label";

const families: { value: FontFamily; label: string; sample: string }[] = [
  { value: "serif", label: "Classic Missal", sample: "Libre Baskerville" },
  { value: "sans", label: "Modern Clean", sample: "IBM Plex Sans" },
  { value: "modern", label: "Editorial", sample: "Inter / Plex Serif" },
];

const sizes: { value: FontSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra large" },
];

export function SettingsSheet() {
  const { theme, setTheme, fontFamily, setFontFamily, fontSize, setFontSize } =
    useSettings();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Settings</SheetTitle>
          <SheetDescription>Tune the appearance and reading experience.</SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8 px-1">
          <section>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Appearance
            </Label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center gap-2 rounded-md border p-3 text-sm transition-colors ${
                  theme === "light"
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun className="h-4 w-4" /> Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center gap-2 rounded-md border p-3 text-sm transition-colors ${
                  theme === "dark"
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon className="h-4 w-4" /> Dark
              </button>
            </div>
          </section>

          <section>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Font family
            </Label>
            <div className="mt-3 space-y-2">
              {families.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFontFamily(f.value)}
                  className={`w-full rounded-md border p-3 text-left transition-colors ${
                    fontFamily === f.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm">{f.label}</div>
                  <div className="text-xs text-muted-foreground">{f.sample}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Font size
            </Label>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setFontSize(s.value)}
                  className={`rounded-md border p-3 text-sm transition-colors ${
                    fontSize === s.value
                      ? "border-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Preview: <span className="text-foreground">The Lord is my shepherd.</span>
            </p>
          </section>

          <p className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground">
            Settings are saved on this device.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}