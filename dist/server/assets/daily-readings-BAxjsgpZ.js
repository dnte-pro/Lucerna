import { g as getCurrentSeason } from "./liturgical-BnruEgxp.js";
const POOL = [
  {
    firstReading: {
      ref: "Isaiah 55:1–3",
      text: "Thus says the Lord: All you who are thirsty, come to the water! You who have no money, come, receive grain and eat; come, without paying and without cost, drink wine and milk! Why spend your money for what is not bread, your wages for what fails to satisfy? Heed me, and you shall eat well, you shall delight in rich fare. Come to me heedfully, listen, that you may have life."
    },
    psalm: {
      ref: "Psalm 145",
      response: "The hand of the Lord feeds us; he answers all our needs.",
      text: "The Lord is gracious and merciful, slow to anger and of great kindness. The Lord is good to all and compassionate toward all his works."
    },
    gospel: {
      ref: "Matthew 14:13–21",
      text: "When Jesus heard of the death of John the Baptist, he withdrew in a boat to a deserted place by himself. The crowds heard of this and followed him on foot from their towns. When he disembarked and saw the vast crowd, his heart was moved with pity for them, and he cured their sick."
    },
    reflection: "Christ feeds both body and soul. In every hunger we carry, he meets us with abundance."
  },
  {
    firstReading: {
      ref: "Jeremiah 31:31–34",
      text: "The days are coming, says the Lord, when I will make a new covenant with the house of Israel and the house of Judah. I will place my law within them and write it upon their hearts; I will be their God, and they shall be my people."
    },
    psalm: {
      ref: "Psalm 51",
      response: "Create a clean heart in me, O God.",
      text: "Have mercy on me, O God, in your goodness; in the greatness of your compassion wipe out my offense."
    },
    gospel: {
      ref: "John 12:20–33",
      text: "Amen, amen, I say to you, unless a grain of wheat falls to the ground and dies, it remains just a grain of wheat; but if it dies, it produces much fruit."
    },
    reflection: "The covenant is written on the heart through self-gift. What we surrender, Christ multiplies."
  },
  {
    firstReading: {
      ref: "Acts 2:1–11",
      text: "When the time for Pentecost was fulfilled, they were all in one place together. And suddenly there came from the sky a noise like a strong driving wind, and it filled the entire house in which they were. Then there appeared to them tongues as of fire."
    },
    psalm: {
      ref: "Psalm 104",
      response: "Lord, send out your Spirit, and renew the face of the earth.",
      text: "Bless the Lord, O my soul! O Lord, my God, you are great indeed!"
    },
    gospel: {
      ref: "John 20:19–23",
      text: "Jesus said to them again, 'Peace be with you. As the Father has sent me, so I send you.' And when he had said this, he breathed on them and said, 'Receive the Holy Spirit.'"
    },
    reflection: "The Spirit is not earned but received — a gift that turns fear into mission."
  },
  {
    firstReading: {
      ref: "1 Kings 19:9–13",
      text: "Then the Lord said: Go outside and stand on the mountain before the Lord; the Lord will be passing by. There was a strong and heavy wind … but the Lord was not in the wind. After the wind there was an earthquake — but the Lord was not in the earthquake. After the earthquake there was fire — but the Lord was not in the fire. After the fire there was a tiny whispering sound."
    },
    psalm: {
      ref: "Psalm 85",
      response: "Lord, let us see your kindness, and grant us your salvation.",
      text: "I will hear what God proclaims; the Lord — for he proclaims peace to his people."
    },
    gospel: {
      ref: "Matthew 14:22–33",
      text: "Jesus made the disciples get into a boat and precede him to the other side, while he dismissed the crowds. After doing so, he went up on the mountain by himself to pray."
    },
    reflection: "God passes in the whisper. Silence is not absence — it is the space where he speaks."
  }
];
function getTodayReading(date = /* @__PURE__ */ new Date()) {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5
  );
  const pick = POOL[dayOfYear % POOL.length];
  const season = getCurrentSeason(date);
  return {
    date: date.toLocaleDateString(void 0, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }),
    season: season.name,
    seasonColor: season.color,
    ...pick
  };
}
export {
  getTodayReading as g
};
