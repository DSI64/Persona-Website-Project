require("dotenv").config();

const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// ============================================================================
// Frontend data paths
// ============================================================================

const personaDataPath = path.resolve(
  __dirname,
  "../../Frontend/src/data/personaDB.js"
);

const characterDataPath = path.resolve(
  __dirname,
  "../../Frontend/src/data/characterDB.js"
);

const socialLinkDataPath = path.resolve(
  __dirname,
  "../../Frontend/src/data/socialLinkDB.js"
);

const trackDataPath = path.resolve(
  __dirname,
  "../../Frontend/src/data/trackData.js"
);

// ============================================================================
// Load an ES module from the frontend
// ============================================================================

async function loadData(filePath, exportName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filePath}`);
  }

  try {
    const module = await import(pathToFileURL(filePath).href);

    if (!(exportName in module)) {
      throw new Error(
        `Export "${exportName}" was not found in ${filePath}`
      );
    }

    return module[exportName];
  } catch (error) {
    console.error(`Failed to load data file: ${filePath}`);
    throw error;
  }
}

// ============================================================================
// Utility functions
// ============================================================================

function toStringValue(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value);
}

function toIntValue(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`Expected a number but received: ${value}`);
  }

  return number;
}

function toStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
}

function toJsonValue(value) {
  if (value === null || value === undefined) {
    return {};
  }

  return value;
}

// ============================================================================
// Seed database
// ============================================================================

async function main() {
  console.log("Starting Persona database seed...\n");

  // --------------------------------------------------------------------------
  // Load frontend datasets
  // --------------------------------------------------------------------------

  const personas = await loadData(personaDataPath, "personaDB");
  const characters = await loadData(characterDataPath, "characterDB");
  const socialLinks = await loadData(
    socialLinkDataPath,
    "socialLinkDB"
  );
  const tracks = await loadData(trackDataPath, "TRACK_DATA");

  // Make sure we actually received arrays.
  if (!Array.isArray(personas)) {
    throw new Error("personaDB is not an array.");
  }

  if (!Array.isArray(characters)) {
    throw new Error("characterDB is not an array.");
  }

  if (!Array.isArray(socialLinks)) {
    throw new Error("socialLinkDB is not an array.");
  }

  if (!Array.isArray(tracks)) {
    throw new Error("TRACK_DATA is not an array.");
  }

  console.log(`Found ${personas.length} personas`);
  console.log(`Found ${characters.length} characters`);
  console.log(`Found ${socialLinks.length} social links`);
  console.log(`Found ${tracks.length} tracks\n`);

  // --------------------------------------------------------------------------
  // Personas
  // --------------------------------------------------------------------------

  console.log("Seeding personas...");

  for (const persona of personas) {
    await prisma.persona.upsert({
      where: {
        id: toStringValue(persona.id),
      },

      update: {
        name: toStringValue(persona.name),
        arcana: toStringValue(persona.arcana),
        originGame: toStringValue(persona.originGame),
        description: toStringValue(persona.description),
        images: toStringArray(persona.images),
        affinities: toJsonValue(persona.affinities),
      },

      create: {
        id: toStringValue(persona.id),
        name: toStringValue(persona.name),
        arcana: toStringValue(persona.arcana),
        originGame: toStringValue(persona.originGame),
        description: toStringValue(persona.description),
        images: toStringArray(persona.images),
        affinities: toJsonValue(persona.affinities),
      },
    });
  }

  console.log(`Seeded ${personas.length} personas.\n`);

  // --------------------------------------------------------------------------
  // Characters
  // --------------------------------------------------------------------------

  console.log("Seeding characters...");

  for (const character of characters) {
    await prisma.character.upsert({
      where: {
        id: toIntValue(character.id),
      },

      update: {
        name: toStringValue(character.name),
        game: toStringValue(character.game),
        arcana: toStringValue(character.arcana),
        image: toStringValue(character.image),
        title: toStringValue(character.title),
        birthday: toStringValue(character.birthday),
        appearances: toStringValue(character.appearances),
        personas: toStringValue(character.personas),
        voiceActors: toStringValue(character.voiceActors),
        likes: toStringValue(character.likes),
        dislikes: toStringValue(character.dislikes),
        profile: toStringValue(character.profile),
        images: toStringArray(character.images),
      },

      create: {
        id: toIntValue(character.id),
        name: toStringValue(character.name),
        game: toStringValue(character.game),
        arcana: toStringValue(character.arcana),
        image: toStringValue(character.image),
        title: toStringValue(character.title),
        birthday: toStringValue(character.birthday),
        appearances: toStringValue(character.appearances),
        personas: toStringValue(character.personas),
        voiceActors: toStringValue(character.voiceActors),
        likes: toStringValue(character.likes),
        dislikes: toStringValue(character.dislikes),
        profile: toStringValue(character.profile),
        images: toStringArray(character.images),
      },
    });
  }

  console.log(`Seeded ${characters.length} characters.\n`);

  // --------------------------------------------------------------------------
  // Social Links
  // --------------------------------------------------------------------------

  console.log("Seeding social links...");

  for (const socialLink of socialLinks) {
    await prisma.socialLink.upsert({
      where: {
        id: toStringValue(socialLink.id),
      },

      update: {
        name: toStringValue(socialLink.name),
        game: toStringValue(socialLink.game),
        arcana: toStringValue(socialLink.arcana),
        title: toStringValue(socialLink.title),
        image: toStringValue(socialLink.image),
        bio: toStringValue(socialLink.bio),
        availability: toStringValue(socialLink.availability),
        requirements: toStringValue(socialLink.requirements),
      },

      create: {
        id: toStringValue(socialLink.id),
        name: toStringValue(socialLink.name),
        game: toStringValue(socialLink.game),
        arcana: toStringValue(socialLink.arcana),
        title: toStringValue(socialLink.title),
        image: toStringValue(socialLink.image),
        bio: toStringValue(socialLink.bio),
        availability: toStringValue(socialLink.availability),
        requirements: toStringValue(socialLink.requirements),
      },
    });
  }

  console.log(`Seeded ${socialLinks.length} social links.\n`);

  // --------------------------------------------------------------------------
  // Music tracks
  // --------------------------------------------------------------------------

  console.log("Seeding music tracks...");

  for (const track of tracks) {
    await prisma.track.upsert({
      where: {
        id: toIntValue(track.id),
      },

      update: {
        title: toStringValue(track.title),
        game: toStringValue(track.game),
        category: toStringValue(track.category),
        artist: toStringValue(track.artist),
        duration:
          track.duration === null || track.duration === undefined
            ? null
            : toStringValue(track.duration),
        themeClass: toStringValue(track.themeClass),
        embedId: toStringValue(track.embedId),
        boxArt: toStringValue(track.boxArt),
      },

      create: {
        id: toIntValue(track.id),
        title: toStringValue(track.title),
        game: toStringValue(track.game),
        category: toStringValue(track.category),
        artist: toStringValue(track.artist),
        duration:
          track.duration === null || track.duration === undefined
            ? null
            : toStringValue(track.duration),
        themeClass: toStringValue(track.themeClass),
        embedId: toStringValue(track.embedId),
        boxArt: toStringValue(track.boxArt),
      },
    });
  }

  console.log(`Seeded ${tracks.length} music tracks.\n`);

  // --------------------------------------------------------------------------
  // Complete
  // --------------------------------------------------------------------------

  console.log("======================================");
  console.log(" Persona database seed complete!");
  console.log("======================================");
}

// ============================================================================
// Execute
// ============================================================================

main()
  .catch((error) => {
    console.error("\nSeed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });