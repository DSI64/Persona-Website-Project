const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { arcana, originGame } = req.query;

    const where = {};

    if (arcana) {
      where.arcana = arcana;
    }

    if (originGame) {
      where.originGame = {
        in: originGame.split(";"),
      };
    }

    const personas = await prisma.persona.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    res.json(personas);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch personas",
    });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const persona = await prisma.persona.findUnique({
      where: {
        name: req.params.name,
      },
    });

    if (!persona) {
      return res.status(404).json({
        error: "Persona not found",
      });
    }

    res.json(persona);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch persona",
    });
  }
});

module.exports = router;