import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api/characters", async (req, res) => {
  try {
    const characters = await prisma.character.findMany();
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

app.get("/api/personas", async (req, res) => {
  try {
    const personas = await prisma.persona.findMany();
    res.json(personas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch personas" });
  }
});

app.get("/api/social-links", async (req, res) => {
  try {
    const socialLinks = await prisma.socialLink.findMany();
    res.json(socialLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch social links" });
  }
});

app.get("/api/tracks", async (req, res) => {
  try {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});