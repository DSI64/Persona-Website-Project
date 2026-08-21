const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { game, category, artist } = req.query;

    const where = {};

    if (game) {
      where.game = game;
    }

    if (category) {
      where.category = category;
    }

    if (artist) {
      where.artist = artist;
    }

    const tracks = await prisma.track.findMany({
      where,
      orderBy: {
        id: "asc",
      },
    });

    res.json(tracks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch music tracks",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const track = await prisma.track.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!track) {
      return res.status(404).json({
        error: "Track not found",
      });
    }

    res.json(track);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch track",
    });
  }
});

module.exports = router;