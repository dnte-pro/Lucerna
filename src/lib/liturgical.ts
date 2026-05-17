// Simple liturgical season calculator (Roman Rite, ordinary form).
// Approximation good enough for app display.

export interface Season {
  name: string;
  color: string; // liturgical color
  description: string;
  tone: "violet" | "white" | "green" | "red" | "rose";
}

function easterSunday(year: number): Date {
  // Anonymous Gregorian algorithm (Meeus/Jones/Butcher)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function firstSundayOfAdvent(year: number): Date {
  // Sunday closest to Nov 30 (St Andrew). Range Nov 27 – Dec 3.
  const nov30 = new Date(year, 10, 30);
  const dow = nov30.getDay();
  const offset = dow === 0 ? 0 : dow <= 3 ? -dow : 7 - dow;
  return addDays(nov30, offset);
}

export function getCurrentSeason(date: Date = new Date()): Season {
  const year = date.getFullYear();
  const easter = easterSunday(year);
  const ashWednesday = addDays(easter, -46);
  const pentecost = addDays(easter, 49);
  const adventStart = firstSundayOfAdvent(year);
  const christmasEnd = new Date(year + 1, 0, 13); // Baptism of the Lord ~ Jan 13
  const prevYearAdvent = firstSundayOfAdvent(year - 1);
  const prevChristmasEnd = new Date(year, 0, 13);

  if (date >= prevYearAdvent && date < new Date(year, 0, 1)) {
    return seasonOf("advent");
  }
  if (date >= new Date(year, 0, 1) && date <= prevChristmasEnd) {
    return seasonOf("christmas");
  }
  if (date >= ashWednesday && date < easter) return seasonOf("lent");
  if (date >= easter && date <= pentecost) return seasonOf("easter");
  if (date >= adventStart && date <= new Date(year, 11, 24)) return seasonOf("advent");
  if (date >= new Date(year, 11, 25) && date <= christmasEnd) return seasonOf("christmas");
  return seasonOf("ordinary");
}

function seasonOf(key: string): Season {
  switch (key) {
    case "advent":
      return {
        name: "Advent",
        color: "Violet",
        tone: "violet",
        description: "A season of joyful expectation, preparing for the coming of Christ.",
      };
    case "christmas":
      return {
        name: "Christmas",
        color: "White",
        tone: "white",
        description: "We celebrate the Nativity of Our Lord, the Word made flesh.",
      };
    case "lent":
      return {
        name: "Lent",
        color: "Violet",
        tone: "violet",
        description: "Forty days of prayer, fasting, and almsgiving toward Easter.",
      };
    case "easter":
      return {
        name: "Easter",
        color: "White",
        tone: "white",
        description: "Fifty days of paschal joy — Christ is risen, alleluia.",
      };
    default:
      return {
        name: "Ordinary Time",
        color: "Green",
        tone: "green",
        description: "A season of growth in the life of Christ and his Church.",
      };
  }
}

export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}