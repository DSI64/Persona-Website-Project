const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { game, arcana } = req.query;

    const where = {};

    if (game) {
      where.game = game;
    }

    if (arcana) {
      where.arcana = arcana;
    }

    const characters = await prisma.character.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    res.json(characters);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch characters",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const character = await prisma.character.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!character) {
      return res.status(404).json({
        error: "Character not found",
      });
    }

    res.json(character);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch character",
    });
  }
});

module.exports = router;