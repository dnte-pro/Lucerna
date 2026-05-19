export interface Prayer {
  id: string;
  title: string;
  category: string;
  text: string;
  latin?: string;
}

export const prayerCategories = [
  "Essential",
  "Marian",
  "Morning & Evening",
  "Sacraments",
  "Devotions",
  "Litanies",
] as const;

export const prayers: Prayer[] = [
  {
    id: "our-father",
    title: "Our Father",
    category: "Essential",
    text: "Our Father, who art in heaven,\nhallowed be thy name;\nthy kingdom come,\nthy will be done\non earth as it is in heaven.\nGive us this day our daily bread,\nand forgive us our trespasses,\nas we forgive those who trespass against us;\nand lead us not into temptation,\nbut deliver us from evil.\nAmen.",
  },
  {
    id: "hail-mary",
    title: "Hail Mary",
    category: "Marian",
    text: "Hail Mary, full of grace,\nthe Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\nAmen.",
  },
  {
    id: "glory-be",
    title: "Glory Be",
    category: "Essential",
    text: "Glory be to the Father,\nand to the Son,\nand to the Holy Spirit,\nas it was in the beginning,\nis now, and ever shall be,\nworld without end.\nAmen.",
  },
  {
    id: "apostles-creed",
    title: "Apostles' Creed",
    category: "Essential",
    text: "I believe in God,\nthe Father Almighty,\nCreator of heaven and earth,\nand in Jesus Christ, His only Son, our Lord,\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died and was buried;\nHe descended into hell;\non the third day He rose again from the dead;\nHe ascended into heaven,\nand is seated at the right hand of God the Father Almighty;\nfrom there He will come to judge the living and the dead.\nI believe in the Holy Spirit,\nthe Holy Catholic Church,\nthe communion of Saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\nAmen.",
  },
  {
    id: "act-of-contrition",
    title: "Act of Contrition",
    category: "Sacraments",
    text: "O my God, I am heartily sorry\nfor having offended Thee,\nand I detest all my sins\nbecause of Thy just punishments,\nbut most of all because they offend Thee, my God,\nwho art all good and deserving of all my love.\nI firmly resolve, with the help of Thy grace,\nto sin no more\nand to avoid the near occasions of sin.\nAmen.",
  },
  {
    id: "memorare",
    title: "Memorare",
    category: "Marian",
    text: "Remember, O most gracious Virgin Mary,\nthat never was it known\nthat anyone who fled to thy protection,\nimplored thy help, or sought thy intercession\nwas left unaided.\nInspired by this confidence,\nI fly unto thee, O Virgin of virgins, my Mother.\nTo thee do I come, before thee I stand,\nsinful and sorrowful.\nO Mother of the Word Incarnate,\ndespise not my petitions,\nbut in thy mercy hear and answer me.\nAmen.",
  },
  {
    id: "hail-holy-queen",
    title: "Hail, Holy Queen",
    category: "Marian",
    text: "Hail, holy Queen, Mother of mercy,\nhail, our life, our sweetness and our hope.\nTo thee do we cry, poor banished children of Eve;\nto thee do we send up our sighs,\nmourning and weeping in this valley of tears.\nTurn, then, most gracious Advocate,\nthine eyes of mercy toward us,\nand after this, our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\nO clement, O loving, O sweet Virgin Mary!\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ.\nAmen.",
  },
  {
    id: "angelus",
    title: "The Angelus",
    category: "Devotions",
    text: "V. The Angel of the Lord declared unto Mary,\nR. And she conceived of the Holy Spirit.\n\nHail Mary…\n\nV. Behold the handmaid of the Lord,\nR. Be it done unto me according to thy word.\n\nHail Mary…\n\nV. And the Word was made flesh,\nR. And dwelt among us.\n\nHail Mary…\n\nV. Pray for us, O holy Mother of God,\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray: Pour forth, we beseech Thee, O Lord,\nThy grace into our hearts;\nthat we, to whom the Incarnation of Christ, Thy Son,\nwas made known by the message of an angel,\nmay by His Passion and Cross\nbe brought to the glory of His Resurrection;\nthrough the same Christ our Lord.\nAmen.",
  },
  {
    id: "morning-offering",
    title: "Morning Offering",
    category: "Morning & Evening",
    text: "O Jesus, through the Immaculate Heart of Mary,\nI offer You my prayers, works, joys, and sufferings of this day\nfor all the intentions of Your Sacred Heart,\nin union with the Holy Sacrifice of the Mass throughout the world,\nfor the salvation of souls,\nthe reparation of sins,\nthe reunion of all Christians,\nand in particular for the intentions of the Holy Father this month.\nAmen.",
  },
  {
    id: "night-prayer",
    title: "Night Prayer",
    category: "Morning & Evening",
    text: "Visit, we beseech Thee, O Lord,\nthis dwelling, and drive from it all the snares of the enemy;\nlet Thy holy angels dwell herein to preserve us in peace;\nand let Thy blessing be upon us\nthrough Jesus Christ our Lord.\nAmen.",
  },
  {
    id: "divine-mercy-chaplet",
    title: "Chaplet of Divine Mercy",
    category: "Devotions",
    text: "Opening: Our Father…, Hail Mary…, Apostles' Creed.\n\nOn the Our Father beads:\nEternal Father, I offer You the Body and Blood,\nSoul and Divinity of Your dearly beloved Son,\nOur Lord Jesus Christ,\nin atonement for our sins and those of the whole world.\n\nOn the Hail Mary beads:\nFor the sake of His sorrowful Passion,\nhave mercy on us and on the whole world.\n\nClosing (3x):\nHoly God, Holy Mighty One, Holy Immortal One,\nhave mercy on us and on the whole world.",
  },
  {
    id: "st-michael-prayer",
    title: "Prayer to St. Michael",
    category: "Devotions",
    text: "Saint Michael the Archangel,\ndefend us in battle.\nBe our protection against the wickedness\nand snares of the devil;\nmay God rebuke him, we humbly pray;\nand do thou, O Prince of the heavenly host,\nby the power of God,\nthrust into hell Satan and all evil spirits\nwho wander through the world\nseeking the ruin of souls.\nAmen.",
  },
  {
    id: "guardian-angel",
    title: "Guardian Angel Prayer",
    category: "Morning & Evening",
    text: "Angel of God, my guardian dear,\nto whom God's love commits me here,\never this day be at my side,\nto light and guard, to rule and guide.\nAmen.",
  },
  {
    id: "grace-before-meals",
    title: "Grace Before Meals",
    category: "Essential",
    text: "Bless us, O Lord,\nand these Thy gifts,\nwhich we are about to receive\nfrom Thy bounty,\nthrough Christ our Lord.\nAmen.",
  },
  {
    id: "grace-after-meals",
    title: "Grace After Meals",
    category: "Essential",
    text: "We give Thee thanks,\nAlmighty God,\nfor all Thy benefits,\nwho livest and reignest\nworld without end.\nAmen.\n\nMay the souls of the faithful departed,\nthrough the mercy of God,\nrest in peace.\nAmen.",
  },
  {
    id: "anima-christi",
    title: "Anima Christi",
    category: "Sacraments",
    text: "Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\nO good Jesus, hear me.\nWithin Your wounds hide me.\nSeparated from You, let me never be.\nFrom the malignant enemy, defend me.\nAt the hour of death, call me.\nAnd close to You bid me.\nThat with Your saints, I may be,\npraising You forever and ever.\nAmen.",
  },
  {
    id: "litany-blessed-virgin",
    title: "Litany of the Blessed Virgin Mary",
    category: "Litanies",
    text: "Lord, have mercy. Christ, have mercy.\nLord, have mercy. Christ, hear us.\nChrist, graciously hear us.\n\nGod, the Father of Heaven, have mercy on us.\nGod the Son, Redeemer of the world, have mercy on us.\nGod the Holy Spirit, have mercy on us.\nHoly Trinity, One God, have mercy on us.\n\nHoly Mary, pray for us.\nHoly Mother of God, pray for us.\nHoly Virgin of virgins, pray for us.\nMother of Christ, pray for us.\nMother of the Church, pray for us.\nMother of divine grace, pray for us.\nMother most pure, pray for us.\nMother most chaste, pray for us.\nMother inviolate, pray for us.\nMother undefiled, pray for us.\nMother most amiable, pray for us.\nMother most admirable, pray for us.\nMother of good counsel, pray for us.\nMother of our Creator, pray for us.\nMother of our Savior, pray for us.\n\nVirgin most prudent, pray for us.\nVirgin most venerable, pray for us.\nVirgin most renowned, pray for us.\nVirgin most powerful, pray for us.\nVirgin most merciful, pray for us.\nVirgin most faithful, pray for us.\n\nMirror of justice, pray for us.\nSeat of wisdom, pray for us.\nCause of our joy, pray for us.\nSpiritual vessel, pray for us.\nVessel of honor, pray for us.\nSingular vessel of devotion, pray for us.\nMystical rose, pray for us.\nTower of David, pray for us.\nTower of ivory, pray for us.\nHouse of gold, pray for us.\nArk of the covenant, pray for us.\nGate of heaven, pray for us.\nMorning star, pray for us.\nHealth of the sick, pray for us.\nRefuge of sinners, pray for us.\nComforter of the afflicted, pray for us.\nHelp of Christians, pray for us.\n\nQueen of Angels, pray for us.\nQueen of Patriarchs, pray for us.\nQueen of Prophets, pray for us.\nQueen of Apostles, pray for us.\nQueen of Martyrs, pray for us.\nQueen of Confessors, pray for us.\nQueen of Virgins, pray for us.\nQueen of all Saints, pray for us.\nQueen conceived without original sin, pray for us.\nQueen assumed into Heaven, pray for us.\nQueen of the most holy Rosary, pray for us.\nQueen of families, pray for us.\nQueen of peace, pray for us.\n\nLamb of God, who takest away the sins of the world,\nspare us, O Lord.\nLamb of God, who takest away the sins of the world,\ngraciously hear us, O Lord.\nLamb of God, who takest away the sins of the world,\nhave mercy on us.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ.\nAmen.",
  },
];

export function getPrayersByCategory(category: string): Prayer[] {
  return prayers.filter((p) => p.category === category);
}