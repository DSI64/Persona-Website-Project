const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const personaDB = [
  {
    id: "vulcanus",
    name: "Vulcanus",
    arcana: "Sun",
    originGame: "P2",
    description: "The Roman god of fire and metalworking. Tatsuya Suou's initial Persona in Persona 2: Innocent Sin.",
    images: [
      "Vulcanus - Persona 2 Innocent Sin",
      "Vulcanus Prime - P2 Concept Art"
    ],
    affinities: { phys: "Resist", fire: "Drain", ice: "Weak", nuclear: "Resist" },
    skills: [
      { level: 1, name: "Agidyne", cost: "12 SP", effect: "Deals heavy Fire damage to 1 foe." },
      { level: 12, name: "Foormula", cost: "8 SP", effect: "Deals medium Fire/Nuclear damage." },
      { level: 24, name: "Frei", cost: "6 SP", effect: "Deals light Nuclear damage to 1 foe." }
    ]
  },
  {
    id: "orpheus",
    name: "Orpheus",
    arcana: "Fool",
    originGame: "P3",
    description: "A hero from Greek mythology who traveled to the underworld to retrieve his wife, Eurydice.",
    images: [
      "Orpheus - Persona 3 Original",
      "Orpheus - Persona 5X Design",
      "Orpheus - Female Variant (Kotone)"
    ],
    affinities: { fire: "Resist", elec: "Weak", curse: "Weak" },
    skills: [
      { level: 1, name: "Agi", cost: "4 SP", effect: "Deals weak Fire damage to 1 foe." },
      { level: 1, name: "Tarunda", cost: "8 SP", effect: "Decreases 1 foe's Attack for 3 turns." },
      { level: 6, name: "Cadenza", cost: "12 SP", effect: "Restores 50% HP and increases Evasion/Accuracy for party." }
    ]
  },
  {
    id: "thanatos",
    name: "Thanatos",
    arcana: "Death",
    originGame: "P3",
    description: "The personification of death in Greek mythology, sporting a ring of coffins.",
    images: [
      "Thanatos - Persona 3 Concept Art",
      "Thanatos - P3 Reload Portrait"
    ],
    affinities: { fire: "Resist", ice: "Resist", elec: "Resist", wind: "Resist", bless: "Weak", curse: "Repel" },
    skills: [
      { level: 1, name: "Maeiga", cost: "8 SP", effect: "Deals medium Curse damage to all foes." },
      { level: 65, name: "Door of Hades", cost: "32 SP", effect: "Deals heavy Almighty damage with medium instant kill chance." }
    ]
  },
  {
    id: "messiah",
    name: "Messiah",
    arcana: "Judgement",
    originGame: "P3",
    description: "The savior born from the combination of the Fool and Death arcanas.",
    images: [
      "Messiah - Persona 3 Original",
      "Messiah - P3 Reload Art"
    ],
    affinities: { fire: "Resist", ice: "Resist", elec: "Resist", wind: "Resist", bless: "Repel", curse: "Weak" },
    skills: [
      { level: 1, name: "Megidolaon", cost: "38 SP", effect: "Deals severe Almighty damage to all foes." },
      { level: 93, name: "Oratorio", cost: "38 SP", effect: "Fully restores HP and cures ailments for party." }
    ]
  },
  {
    id: "izanagi",
    name: "Izanagi",
    arcana: "Fool",
    originGame: "P4",
    description: "A deity born in Japanese mythology who created the Japanese archipelago alongside Izanami.",
    images: [
      "Izanagi - Persona 4 Golden Artwork",
      "Izanagi - Persona 4 Arena Cutin"
    ],
    affinities: { elec: "Resist", wind: "Weak", curse: "Null" },
    skills: [
      { level: 1, name: "Zio", cost: "4 SP", effect: "Deals weak Electric damage to 1 foe." },
      { level: 1, name: "Cleave", cost: "6% HP", effect: "Deals weak Physical damage to 1 foe." },
      { level: 3, name: "Rakukaja", cost: "12 SP", effect: "Increases 1 ally's Defense for 3 turns." }
    ]
  },
  {
    id: "magatsu-izanagi",
    name: "Magatsu-Izanagi",
    arcana: "Tower",
    originGame: "P4",
    description: "An impure variant of Izanagi symbolizing corruption and madness.",
    images: [
      "Magatsu-Izanagi - P4G Portrait",
      "Magatsu-Izanagi Picaro - P5 Royal"
    ],
    affinities: { phys: "Resist", bless: "Weak", curse: "Repel" },
    skills: [
      { level: 1, name: "Magatsu Mandala", cost: "30 SP", effect: "Deals heavy Curse damage to all foes with ailment chance." },
      { level: 50, name: "Calamity Drop", cost: "10% HP", effect: "Deals severe Physical damage to 1 foe." }
    ]
  },
  {
    id: "arsene",
    name: "Arsène",
    arcana: "Fool",
    originGame: "P5",
    description: "Inspired by the famed gentleman thief Arsène Lupin, manifestation of rebellion.",
    images: [
      "Arsène - Persona 5 Original Artwork",
      "Arsène - Persona 5 Strikers Render"
    ],
    affinities: { ice: "Weak", bless: "Weak", curse: "Resist" },
    skills: [
      { level: 1, name: "Eiha", cost: "4 SP", effect: "Deals weak Curse damage to 1 foe." },
      { level: 2, name: "Sukunda", cost: "8 SP", effect: "Decreases 1 foe's Agility for 3 turns." },
      { level: 4, name: "Dream Needle", cost: "8% HP", effect: "Deals weak Physical damage with Sleep chance." }
    ]
  },
  {
    id: "satanael",
    name: "Satanael",
    arcana: "Fool",
    originGame: "P5",
    description: "An archangel who rebelled against God, representing ultimate freedom and defiance.",
    images: [
      "Satanael - Persona 5 Royal Cutin",
      "Satanael - Final Boss Summon Artwork"
    ],
    affinities: { phys: "Resist", fire: "Resist", ice: "Resist", elec: "Resist", wind: "Resist", psy: "Resist", nuclear: "Resist", bless: "Null", curse: "Repel" },
    skills: [
      { level: 1, name: "Sinful Shell", cost: "38 SP", effect: "Deals severe Almighty damage to all foes." },
      { level: 95, name: "Victory Cry", cost: "Passive", effect: "Fully restores HP/SP after battle." }
    ]
  },
  {
    id: "jack-frost",
    name: "Jack Frost",
    arcana: "Magician",
    originGame: "P1",
    description: "A winter spirit that takes the form of a cheerful snowman. Hee-ho!",
    images: [
      "Jack Frost - Standard Mascot Art",
      "Jack Frost - Classic Shin Megami Tensei Art"
    ],
    affinities: { fire: "Weak", ice: "Drain" },
    skills: [
      { level: 1, name: "Bufu", cost: "4 SP", effect: "Deals weak Ice damage to 1 foe." },
      { level: 1, name: "Ice Break", cost: "15 SP", effect: "Suppresses Ice resistance of all foes." }
    ]
  },
  {
    id: "yoshitsune",
    name: "Yoshitsune",
    arcana: "Tower",
    originGame: "P4",
    description: "A legendary general of the Minamoto clan famous for his miraculous feats in battle.",
    images: [
      "Yoshitsune - P4G Portrait",
      "Yoshitsune - P5 Royal Artwork"
    ],
    affinities: { phys: "Repel", fire: "Resist", elec: "Repel", bless: "Repel" },
    skills: [
      { level: 1, name: "Hassou Tobi", cost: "24% HP", effect: "Deals 8 light Physical attacks to all foes." },
      { level: 86, name: "Charge", cost: "15 SP", effect: "Multiplies next Physical attack damage by 2.5." }
    ]
  }
];

async function main() {
  console.log('Start seeding personas...');
  for (const p of personaDB) {
    await prisma.persona.upsert({
      where: { name: p.name },
      update: {},
      create: {
        name: p.name,
        game: p.originGame,
        arcana: p.arcana,
        level: 1,
        stats: { description: p.description, affinities: p.affinities, images: p.images },
        skills: p.skills,
      },
    });
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });