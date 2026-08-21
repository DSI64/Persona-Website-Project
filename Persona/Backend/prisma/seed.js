import { PrismaClient } from "../generated/prisma/client.js";

import { characterDB } from "../../Frontend/src/data/characterDB.js";
import { personaDB } from "../../Frontend/src/data/personaDB.js";
import { socialLinkDB } from "../../Frontend/src/data/socialLinkDB.js";
import { TRACK_DATA } from "../../Frontend/src/data/trackData.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Clear existing data first so reseeding doesn't create duplicates.
  await prisma.character.deleteMany();
  await prisma.persona.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.track.deleteMany();

  console.log("Old data cleared.");

  // Characters
  await prisma.character.createMany({
    data: characterDB.map((character) => ({
      id: character.id,
      name: character.name,
      game: character.game,
      arcana: character.arcana,
      image: character.image,
      title: character.title,
      birthday: character.birthday,
      appearances: character.appearances,
      personas: character.personas,
      voiceActors: character.voiceActors,
      likes: character.likes,
      dislikes: character.dislikes,
      profile: character.profile,
      images: character.images,
    })),
  });

  console.log(`Inserted ${characterDB.length} characters.`);

  // Personas
  await prisma.persona.createMany({
    data: personaDB.map((persona) => ({
      id: persona.id,
      name: persona.name,
      arcana: persona.arcana,
      originGame: persona.originGame,
      description: persona.description,
      images: persona.images,
      affinities: persona.affinities,
    })),
  });

  console.log(`Inserted ${personaDB.length} Personas.`);

  // Social Links
  await prisma.socialLink.createMany({
    data: socialLinkDB.map((socialLink) => ({
      id: socialLink.id,
      name: socialLink.name,
      game: socialLink.game,
      arcana: socialLink.arcana,
      title: socialLink.title,
      image: socialLink.image,
      bio: socialLink.bio,
      availability: socialLink.availability,
      requirements: socialLink.requirements,
    })),
  });

  console.log(`Inserted ${socialLinkDB.length} Social Links.`);

  // Tracks
  await prisma.track.createMany({
    data: TRACK_DATA.map((track) => ({
      id: track.id,
      title: track.title,
      game: track.game,
      category: track.category,
      artist: track.artist,
      themeClass: track.themeClass,
      embedId: track.embedId,
      boxArt: track.boxArt,
    })),
  });

  console.log(`Inserted ${TRACK_DATA.length} tracks.`);

  console.log("Database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });