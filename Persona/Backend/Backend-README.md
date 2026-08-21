# Persona Backend

The backend for the Persona Website Project. It uses **Node.js + Express + Prisma 7 + PostgreSQL**.

## Setup

From this directory:

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Install the PostgreSQL driver adapter used by Prisma 7:

```bash
npm install @prisma/adapter-pg pg
```

## Prisma

Generate the client:

```bash
npm run db:generate
```

Push the current schema:

```bash
npm run db:push
```

Create/apply a migration:

```bash
npm run db:migrate
```

## Seed

The seed is located at `prisma/seed.js` and imports the project's Character, Persona, Social Link, and Track source data.

Run:

```bash
npm run db:seed
```

The seed clears the existing Character, Persona, SocialLink, and Track records before inserting the source data again.

For Prisma 7 + PostgreSQL, the client must use the adapter:

```js
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
```

## Start

```bash
npm run dev
```

Or:

```bash
npm start
```

The development server is currently configured to run on port `3001`.

## Prisma Studio

```bash
npx prisma studio
```

## Adding a Backend Feature

1. Edit `prisma/schema.prisma`.
2. Run `npm run db:push` or `npm run db:migrate`.
3. Run `npm run db:generate`.
4. Add/update seed data when necessary.
5. Add the API route in `src/server.js`.
6. Test the API.
7. Connect the frontend.

Example route:

```js
app.get("/api/example", async (req, res) => {
  try {
    const examples = await prisma.example.findMany();
    res.json(examples);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch examples" });
  }
});
```

## Current API

```text
GET /api/characters
GET /api/personas
GET /api/social-links
GET /api/tracks
```

## Scripts

```text
npm run dev
npm start
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:seed
```
