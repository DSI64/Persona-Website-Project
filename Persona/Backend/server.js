const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Persona Database API is running...');
});

// Example API route to get all Social Links
app.get('/api/social-links', async (req, res) => {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      include: {
        ranks: {
          include: {
            interactions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    });
    res.json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});