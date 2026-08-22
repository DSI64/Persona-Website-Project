import cors from "cors";
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const personaRoutes = require("./routes/personas");
const characterRoutes = require("./routes/characters");
const socialLinkRoutes = require("./routes/socialLinks");
const musicRoutes = require("./routes/music");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://persona-website-project.vercel.app"
    ]
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Persona Website Backend is running!",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Frontend successfully connected to backend.",
  });
});

app.use("/api/personas", personaRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/social-links", socialLinkRoutes);
app.use("/api/music", musicRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});