export type MysterySet = "Joyful" | "Sorrowful" | "Glorious" | "Luminous";

export interface Mystery {
  title: string;
  fruit: string;
  scripture: string;
}

export const mysteries: Record<MysterySet, { day: string; mysteries: Mystery[] }> = {
  Joyful: {
    day: "Monday & Saturday",
    mysteries: [
      { title: "The Annunciation", fruit: "Humility", scripture: "Luke 1:26–38" },
      { title: "The Visitation", fruit: "Love of neighbor", scripture: "Luke 1:39–56" },
      { title: "The Nativity", fruit: "Poverty of spirit", scripture: "Luke 2:1–20" },
      { title: "The Presentation in the Temple", fruit: "Obedience", scripture: "Luke 2:22–38" },
      { title: "The Finding of Jesus in the Temple", fruit: "Joy in finding Jesus", scripture: "Luke 2:41–52" },
    ],
  },
  Sorrowful: {
    day: "Tuesday & Friday",
    mysteries: [
      { title: "The Agony in the Garden", fruit: "Sorrow for sin", scripture: "Matthew 26:36–46" },
      { title: "The Scourging at the Pillar", fruit: "Purity", scripture: "Matthew 27:26" },
      { title: "The Crowning with Thorns", fruit: "Moral courage", scripture: "Matthew 27:27–31" },
      { title: "The Carrying of the Cross", fruit: "Patience", scripture: "Luke 23:26–32" },
      { title: "The Crucifixion", fruit: "Self-denial", scripture: "Luke 23:33–46" },
    ],
  },
  Glorious: {
    day: "Wednesday & Sunday",
    mysteries: [
      { title: "The Resurrection", fruit: "Faith", scripture: "Matthew 28:1–10" },
      { title: "The Ascension", fruit: "Hope", scripture: "Acts 1:6–11" },
      { title: "The Descent of the Holy Spirit", fruit: "Wisdom and love of God", scripture: "Acts 2:1–13" },
      { title: "The Assumption of Mary", fruit: "Grace of a happy death", scripture: "Revelation 12:1" },
      { title: "The Coronation of Mary", fruit: "Trust in Mary's intercession", scripture: "Revelation 12:1" },
    ],
  },
  Luminous: {
    day: "Thursday",
    mysteries: [
      { title: "The Baptism of Jesus in the Jordan", fruit: "Openness to the Holy Spirit", scripture: "Matthew 3:13–17" },
      { title: "The Wedding at Cana", fruit: "Fidelity through Mary's intercession", scripture: "John 2:1–11" },
      { title: "The Proclamation of the Kingdom", fruit: "Repentance and trust in God", scripture: "Mark 1:14–15" },
      { title: "The Transfiguration", fruit: "Desire for holiness", scripture: "Matthew 17:1–8" },
      { title: "The Institution of the Eucharist", fruit: "Eucharistic love", scripture: "Matthew 26:26–29" },
    ],
  },
};

export function getTodaysMystery(date = new Date()): MysterySet {
  // Sunday = 0, Monday = 1, ...
  switch (date.getDay()) {
    case 1: // Monday
    case 6: // Saturday
      return "Joyful";
    case 2: // Tuesday
    case 5: // Friday
      return "Sorrowful";
    case 4: // Thursday
      return "Luminous";
    case 0: // Sunday
    case 3: // Wednesday
    default:
      return "Glorious";
  }
}

export interface RosaryStep {
  label: string;
  instruction: string;
  prayer?: string;
}

export const rosarySteps: RosaryStep[] = [
  {
    label: "1. Sign of the Cross & Apostles' Creed",
    instruction: "Hold the crucifix.",
    prayer:
      "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nI believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of Saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  },
  {
    label: "2. Our Father",
    instruction: "On the first large bead.",
    prayer:
      "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
  },
  {
    label: "3. Three Hail Marys",
    instruction: "On the next three small beads — for faith, hope, and charity.",
    prayer:
      "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  },
  {
    label: "4. Glory Be",
    instruction: "",
    prayer:
      "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.",
  },
  {
    label: "5. Announce the First Mystery",
    instruction:
      "Meditate on the mystery, then pray the Our Father on the large bead.",
  },
  {
    label: "6. Ten Hail Marys (a decade)",
    instruction: "One on each of the ten small beads, meditating on the mystery.",
    prayer:
      "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  },
  {
    label: "7. Glory Be & Fatima Prayer",
    instruction: "After each decade.",
    prayer:
      "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy. Amen.",
  },
  {
    label: "8. Repeat for the remaining four mysteries",
    instruction:
      "Announce each mystery, then Our Father, ten Hail Marys, Glory Be, and Fatima Prayer.",
  },
  {
    label: "9. Hail, Holy Queen",
    instruction: "After all five decades.",
    prayer:
      "Hail, holy Queen, Mother of mercy, hail, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn, then, most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.",
  },
  {
    label: "10. Closing Prayer & Sign of the Cross",
    instruction: "",
    prayer:
      "O God, whose only-begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life: grant, we beseech Thee, that meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise. Through the same Christ our Lord. Amen.\n\nIn the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  },
];