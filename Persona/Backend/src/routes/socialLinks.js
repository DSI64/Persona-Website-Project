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

    const socialLinks = await prisma.socialLink.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    res.json(socialLinks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch social links",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const socialLink = await prisma.socialLink.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!socialLink) {
      return res.status(404).json({
        error: "Social Link not found",
      });
    }

    res.json(socialLink);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch social link",
    });
  }
});

module.exports = router;