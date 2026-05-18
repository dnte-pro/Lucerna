const KEY = "lucerna-notify";

export interface NotifySettings {
  enabled: boolean;
  time: string; // "HH:MM"
}

export function loadNotifySettings(): NotifySettings {
  if (typeof window === "undefined") return { enabled: false, time: "07:30" };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { enabled: false, time: "07:30" };
}

export function saveNotifySettings(s: NotifySettings) {
  localStorage.setItem(KEY, JSON.stringify(s));
  scheduleNext(s);
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (typeof Notification === "undefined") return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return await Notification.requestPermission();
}

let timer: number | null = null;

function nextOccurrence(time: string): number {
  const [h, m] = time.split(":").map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(h || 7, m || 30, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

export function scheduleNext(s: NotifySettings) {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  if (!s.enabled || typeof Notification === "undefined") return;
  if (Notification.permission !== "granted") return;
  const delay = nextOccurrence(s.time);
  timer = window.setTimeout(() => {
    try {
      new Notification("Lucerna — Time to pray", {
        body: "Pause for your daily prayer and reading.",
        icon: "/icon.svg",
      });
    } catch {}
    scheduleNext(s);
  }, Math.min(delay, 2_147_000_000));
}

export function bootNotifications() {
  const s = loadNotifySettings();
  if (s.enabled) scheduleNext(s);
}