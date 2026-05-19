import { useEffect, useMemo, useState } from "react";
import { getCurrentSeason } from "./liturgical";

export interface DailyReading {
  date: string;
  season: string;
  seasonColor: string;
  firstReading: { ref: string; text: string };
  psalm: { ref: string; response: string; text: string };
  secondReading?: { ref: string; text: string };
  gospel: { ref: string; text: string };
  reflection: string;
  saint?: string;
  usccbLink?: string;
  source?: "api" | "cache" | "fallback";
  notice?: string;
}

interface CatholicReadingsApiResponse {
  date?: string;
  season?: string;
  readings?: {
    firstReading?: string;
    psalm?: string;
    secondReading?: string;
    gospel?: string;
  };
  usccbLink?: string;
}

interface BibleApiResponse {
  reference?: string;
  text?: string;
  verses?: Array<{
    verse: number;
    text: string;
  }>;
}

const READINGS_API_BASE = "https://cpbjr.github.io/catholic-readings-api/readings";
const BIBLE_API_BASE = "https://bible-api.com";
const CACHE_KEY = "lucerna-daily-readings-cache";
const CACHE_EVENT = "lucerna-daily-readings-cache-changed";
const CACHE_MAX_AGE = 1000 * 60 * 60 * 24 * 8;

type ReadingStatus = "loading" | "live" | "cache" | "fallback";

interface CachedReading {
  reading: DailyReading;
  cachedAt: number;
}

type ReadingCache = Record<string, CachedReading>;

// Deterministic rotation of representative readings; for production use, swap
// for a live USCCB/Universalis feed.
const POOL: Array<Pick<DailyReading, "firstReading" | "psalm" | "gospel" | "reflection">> = [
  {
    firstReading: {
      ref: "Isaiah 55:1–3",
      text: "Thus says the Lord: All you who are thirsty, come to the water! You who have no money, come, receive grain and eat; come, without paying and without cost, drink wine and milk! Why spend your money for what is not bread, your wages for what fails to satisfy? Heed me, and you shall eat well, you shall delight in rich fare. Come to me heedfully, listen, that you may have life.",
    },
    psalm: {
      ref: "Psalm 145",
      response: "The hand of the Lord feeds us; he answers all our needs.",
      text: "The Lord is gracious and merciful, slow to anger and of great kindness. The Lord is good to all and compassionate toward all his works.",
    },
    gospel: {
      ref: "Matthew 14:13–21",
      text: "When Jesus heard of the death of John the Baptist, he withdrew in a boat to a deserted place by himself. The crowds heard of this and followed him on foot from their towns. When he disembarked and saw the vast crowd, his heart was moved with pity for them, and he cured their sick.",
    },
    reflection:
      "Christ feeds both body and soul. In every hunger we carry, he meets us with abundance.",
  },
  {
    firstReading: {
      ref: "Jeremiah 31:31–34",
      text: "The days are coming, says the Lord, when I will make a new covenant with the house of Israel and the house of Judah. I will place my law within them and write it upon their hearts; I will be their God, and they shall be my people.",
    },
    psalm: {
      ref: "Psalm 51",
      response: "Create a clean heart in me, O God.",
      text: "Have mercy on me, O God, in your goodness; in the greatness of your compassion wipe out my offense.",
    },
    gospel: {
      ref: "John 12:20–33",
      text: "Amen, amen, I say to you, unless a grain of wheat falls to the ground and dies, it remains just a grain of wheat; but if it dies, it produces much fruit.",
    },
    reflection:
      "The covenant is written on the heart through self-gift. What we surrender, Christ multiplies.",
  },
  {
    firstReading: {
      ref: "Acts 2:1–11",
      text: "When the time for Pentecost was fulfilled, they were all in one place together. And suddenly there came from the sky a noise like a strong driving wind, and it filled the entire house in which they were. Then there appeared to them tongues as of fire.",
    },
    psalm: {
      ref: "Psalm 104",
      response: "Lord, send out your Spirit, and renew the face of the earth.",
      text: "Bless the Lord, O my soul! O Lord, my God, you are great indeed!",
    },
    gospel: {
      ref: "John 20:19–23",
      text: "Jesus said to them again, 'Peace be with you. As the Father has sent me, so I send you.' And when he had said this, he breathed on them and said, 'Receive the Holy Spirit.'",
    },
    reflection:
      "The Spirit is not earned but received — a gift that turns fear into mission.",
  },
  {
    firstReading: {
      ref: "1 Kings 19:9–13",
      text: "Then the Lord said: Go outside and stand on the mountain before the Lord; the Lord will be passing by. There was a strong and heavy wind … but the Lord was not in the wind. After the wind there was an earthquake — but the Lord was not in the earthquake. After the earthquake there was fire — but the Lord was not in the fire. After the fire there was a tiny whispering sound.",
    },
    psalm: {
      ref: "Psalm 85",
      response: "Lord, let us see your kindness, and grant us your salvation.",
      text: "I will hear what God proclaims; the Lord — for he proclaims peace to his people.",
    },
    gospel: {
      ref: "Matthew 14:22–33",
      text: "Jesus made the disciples get into a boat and precede him to the other side, while he dismissed the crowds. After doing so, he went up on the mountain by himself to pray.",
    },
    reflection:
      "God passes in the whisper. Silence is not absence — it is the space where he speaks.",
  },
];

export function getTodayReading(date: Date = new Date()): DailyReading {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const pick = POOL[dayOfYear % POOL.length]!;
  const season = getCurrentSeason(date);
  return {
    date: date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    season: season.name,
    seasonColor: season.color,
    ...pick,
    source: "fallback",
  };
}

export function useDailyReading(date: Date = new Date()): {
  reading: DailyReading;
  status: ReadingStatus;
  error: string | null;
} {
  const stableDate = useMemo(() => new Date(date), [date.toDateString()]);
  const cacheId = getApiDateParts(stableDate).isoDate;
  const [reading, setReading] = useState<DailyReading>(() => {
    const cached = readCachedReading(cacheId);
    return cached?.reading ?? getTodayReading(stableDate);
  });
  const [status, setStatus] = useState<ReadingStatus>(() =>
    readCachedReading(cacheId) ? "cache" : "fallback",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const cached = readCachedReading(cacheId);

    if (cached && alive) {
      setReading({ ...cached.reading, source: "cache" });
      setStatus("cache");
    } else {
      setReading(getTodayReading(stableDate));
      setStatus("loading");
    }

    fetchDailyReading(stableDate)
      .then((liveReading) => {
        if (!alive) return;
        setReading(liveReading);
        setStatus("live");
        setError(null);
      })
      .catch((err: unknown) => {
        if (!alive) return;
        const message = err instanceof Error ? err.message : "Unable to load daily readings.";
        const nextCached = readCachedReading(cacheId);

        if (nextCached) {
          setReading({
            ...nextCached.reading,
            source: "cache",
            notice: "Showing saved readings while offline.",
          });
          setStatus("cache");
        } else {
          setReading({
            ...getTodayReading(stableDate),
            source: "fallback",
            notice: "Showing built-in readings because live readings are unavailable.",
          });
          setStatus("fallback");
        }

        setError(message);
      });

    return () => {
      alive = false;
    };
  }, [cacheId, stableDate]);

  return { reading, status, error };
}

export async function fetchDailyReading(date: Date = new Date()): Promise<DailyReading> {
  const { year, monthDay, isoDate } = getApiDateParts(date);
  const response = await fetch(`${READINGS_API_BASE}/${year}/${monthDay}.json`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Daily readings API returned ${response.status}.`);
  }

  const data = (await response.json()) as CatholicReadingsApiResponse;
  const reading = await normalizeApiReading(data, date);

  writeCachedReading(isoDate, reading);
  return reading;
}

async function normalizeApiReading(
  data: CatholicReadingsApiResponse,
  date: Date,
): Promise<DailyReading> {
  const season = getCurrentSeason(date);
  const fallback = getTodayReading(date);
  const firstReading = data.readings?.firstReading ?? fallback.firstReading.ref;
  const psalm = data.readings?.psalm ?? fallback.psalm.ref;
  const gospel = data.readings?.gospel ?? fallback.gospel.ref;
  const secondReading = data.readings?.secondReading;
  const [firstReadingText, psalmText, gospelText, secondReadingText] = await Promise.all([
    fetchBibleText(firstReading, fallback.firstReading.text),
    fetchBibleText(psalm, fallback.psalm.text),
    fetchBibleText(gospel, fallback.gospel.text),
    secondReading ? fetchBibleText(secondReading) : Promise.resolve(undefined),
  ]);

  const reading: DailyReading = {
    date: formatDisplayDate(date),
    season: data.season ?? season.name,
    seasonColor: season.color,
    firstReading: {
      ref: firstReading,
      text: firstReadingText,
    },
    psalm: {
      ref: psalm,
      response: "",
      text: psalmText,
    },
    gospel: {
      ref: gospel,
      text: gospelText,
    },
    reflection: fallback.reflection,
    source: "api",
    notice:
      "Mass reading references loaded from Catholic Readings API. Verse text shown from the public-domain Douay-Rheims translation.",
  };

  if (data.usccbLink) {
    reading.usccbLink = data.usccbLink;
  }

  if (secondReading) {
    reading.secondReading = {
      ref: secondReading,
      text: secondReadingText ?? "Second reading text could not be loaded.",
    };
  }

  return reading;
}

function getApiDateParts(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return {
    year,
    monthDay: `${month}-${day}`,
    isoDate: `${year}-${month}-${day}`,
  };
}

async function fetchBibleText(reference: string, fallback?: string): Promise<string> {
  const normalized = normalizeBibleReference(reference);
  if (!normalized) {
    return fallback ?? "Bible text could not be loaded for this reading.";
  }

  try {
    const response = await fetch(
      `${BIBLE_API_BASE}/${encodeURIComponent(normalized)}?translation=dra`,
      { headers: { Accept: "application/json" } },
    );

    if (!response.ok) {
      throw new Error(`Bible API returned ${response.status}.`);
    }

    const data = (await response.json()) as BibleApiResponse;
    return formatBibleText(data) || fallback || "Bible text could not be loaded.";
  } catch {
    return fallback ?? "Bible text could not be loaded for this reading.";
  }
}

function normalizeBibleReference(reference: string) {
  return reference
    .replace(/[–—]/g, "-")
    .replace(/\bPsalms\b/gi, "Psalm")
    .replace(/\bSirach\b/gi, "Ecclesiasticus")
    .replace(/\bRevelation\b/gi, "Apocalypse")
    .replace(/(\d+)([abc])\b/gi, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function formatBibleText(data: BibleApiResponse) {
  if (data.verses?.length) {
    return data.verses
      .map((verse) => `${verse.verse}. ${verse.text.trim()}`)
      .join("\n\n");
  }

  return data.text?.replace(/\n{3,}/g, "\n\n").trim() ?? "";
}

function formatDisplayDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function readCache(): ReadingCache {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") as ReadingCache;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function readCachedReading(isoDate: string): CachedReading | null {
  const cached = readCache()[isoDate];
  if (!cached) return null;
  if (Date.now() - cached.cachedAt > CACHE_MAX_AGE) return null;
  return cached;
}

function writeCachedReading(isoDate: string, reading: DailyReading) {
  if (typeof window === "undefined") return;
  const cache = readCache();
  cache[isoDate] = {
    reading,
    cachedAt: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  window.dispatchEvent(new Event(CACHE_EVENT));
}
