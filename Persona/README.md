# Persona Website Project

A personal Persona-themed website built with **React + Vite** on the frontend and **Express + Prisma + PostgreSQL** on the backend.

The project contains Persona character information, Persona compendium data, Social Links, and music tracks, with the backend providing database-backed API endpoints.

## Project Structure

```text
Persona-Website-Project/
├── README.md
└── Persona/
    ├── Backend/
    │   ├── prisma/
    │   │   ├── migrations/
    │   │   ├── schema.prisma
    │   │   └── seed.js
    │   ├── src/
    │   │   └── server.js
    │   ├── generated/
    │   │   └── prisma/
    │   ├── package.json
    │   └── prisma.config.ts
    │
    └── Frontend/
        ├── public/
        ├── src/
        │   ├── data/
        │   └── ...
        ├── package.json
        └── vite.config.js
```

## Tech Stack

**Frontend:** React 19, Vite 8, React Router, React Player, React YouTube, Sharp, Oxlint.

**Backend:** Node.js, Express 5, Prisma 7, PostgreSQL, CORS, and the Prisma PostgreSQL driver adapter.

The current package files confirm the frontend and backend are separate Node projects, while the backend uses Prisma 7.9.1 and PostgreSQL. citeturn205914view1turn205914view2

## Requirements

Install:

- Node.js (current LTS recommended)
- npm
- PostgreSQL
- Git

You also need a PostgreSQL database that the backend can connect to.

## Clone the Repository

```bash
git clone https://github.com/DSI64/Persona-Website-Project.git
cd Persona-Website-Project/Persona
```

## Backend Setup

Open a terminal in:

```text
Persona/Backend
```

Install dependencies:

```bash
npm install
```

The backend's package scripts include development/startup, Prisma generation, schema push, migration, and seeding commands. citeturn205914view1

### Environment Variables

Create:

```text
Persona/Backend/.env
```

Add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Replace the placeholders with your own database values.

**Do not commit `.env` or database credentials to GitHub.**

### Prisma

The Prisma configuration reads `DATABASE_URL` from the environment and uses `prisma/schema.prisma` as the schema. Seeding is configured to run `node prisma/seed.js`. citeturn205914view3

Generate Prisma Client:

```bash
npm run db:generate
```

Update the database directly during development:

```bash
npm run db:push
```

Create/apply a migration:

```bash
npm run db:migrate
```

### Seed the Database

Run:

```bash
npm run db:seed
```

or:

```bash
npx prisma db seed
```

The seed imports the project's existing frontend data files and inserts Characters, Personas, Social Links, and Tracks into PostgreSQL.

The current seed clears those tables first, so reseeding is intended to rebuild that data from the source files rather than append duplicate records.

### Prisma 7 PostgreSQL Driver Adapter

This project uses Prisma 7 with PostgreSQL. When creating a Prisma Client instance, use the PostgreSQL adapter rather than `new PrismaClient()` by itself.

Install the required packages:

```bash
npm install @prisma/adapter-pg pg
```

The Prisma client setup should follow this pattern:

```js
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
```

## Start the Backend

From `Persona/Backend`:

```bash
npm run dev
```

The backend runs on the port configured by `src/server.js`; in the current project setup this is `3001`.

## Frontend Setup

Open a second terminal in:

```text
Persona/Frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Vite will print the local frontend URL in the terminal, normally:

```text
http://localhost:5173
```

The frontend scripts currently include `dev`, `build`, `lint`, and `preview`. citeturn205914view2

### Frontend Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Start Everything

You normally need two terminals.

### Terminal 1 — Backend

```bash
cd Persona/Backend
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

### Terminal 2 — Frontend

```bash
cd Persona/Frontend
npm install
npm run dev
```

You should then have the frontend and backend running at their respective local addresses.

## Current API

The backend currently exposes API endpoints for the project's main database-backed content, including routes for Characters, Personas, Social Links, and Tracks.

Examples:

```text
GET /api/characters
GET /api/personas
GET /api/social-links
GET /api/tracks
```

When testing locally, use the backend host/port configured by `src/server.js`.

## Starting Backend Development

A typical workflow for adding a backend feature is:

```text
1. Design the data
       ↓
2. Update prisma/schema.prisma
       ↓
3. Push the schema or create a migration
       ↓
4. Run prisma generate
       ↓
5. Add/update seed data if needed
       ↓
6. Add the API route
       ↓
7. Test the endpoint
       ↓
8. Connect the frontend
```

### 1. Add a Prisma Model

Edit:

```text
Backend/prisma/schema.prisma
```

Example:

```prisma
model Example {
  id          Int    @id @default(autoincrement())
  name        String
  description String
}
```

### 2. Update the Database

For quick development:

```bash
npm run db:push
```

For a migration:

```bash
npm run db:migrate
```

Then regenerate the client:

```bash
npm run db:generate
```

### 3. Add an API Route

Routes currently live in `Backend/src/server.js`.

A simple endpoint can look like:

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

### 4. Test the Endpoint

Test the backend directly with a browser, Postman, or another HTTP client before connecting the React frontend.

### 5. Connect the Frontend

Example:

```js
const response = await fetch("http://localhost:3001/api/example");
const data = await response.json();
```

Keep database access in the backend. The frontend should communicate with your API rather than connecting directly to PostgreSQL.

## Adding Seed Data

When adding a new database-backed data type:

1. Add the model to `schema.prisma`.
2. Add the source data.
3. Import the source data into `Backend/prisma/seed.js`.
4. Add a `createMany()` operation to the seed.
5. Update the schema/database.
6. Run `npm run db:generate`.
7. Run `npm run db:seed`.

Example:

```js
await prisma.example.createMany({
  data: exampleData.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
  })),
});
```

## Useful Backend Commands

Run these from `Persona/Backend`:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the backend |
| `npm start` | Start the backend |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:migrate` | Create/apply a Prisma migration |
| `npm run db:seed` | Seed the database |
| `npx prisma studio` | Open Prisma Studio |

Prisma Studio is useful for checking the rows that were inserted by the seed:

```bash
npx prisma studio
```

## Useful Frontend Commands

Run these from `Persona/Frontend`:

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Troubleshooting

### Prisma says a driver adapter is required

Make sure `@prisma/adapter-pg` and `pg` are installed and that the client is created with a `PrismaPg` adapter.

### `DATABASE_URL` is missing

Check that `Persona/Backend/.env` exists and contains a valid PostgreSQL connection string.

### Tables are missing

Run:

```bash
npm run db:push
```

or apply migrations:

```bash
npm run db:migrate
```

Then:

```bash
npm run db:generate
```

### Database is empty

Run:

```bash
npm run db:seed
```

### Frontend cannot connect to backend

Make sure both development servers are running and that the frontend is using the backend URL/port configured for the project.

## Database Models

The current project contains database models for:

- **Character** — character information, profiles, images, appearances, likes/dislikes, voice actors, and related Persona information.
- **Persona** — compendium data such as name, Arcana, origin game, description, images, and affinities.
- **SocialLink** — Social Link name, game, Arcana, title, bio, availability, requirements, and image.
- **Track** — music title, game, category, artist, theme class, embed ID, and box art.

## Security

Never commit:

```text
.env
```

or database passwords, API keys, tokens, or other private credentials.

For a shared example configuration, use a file such as:

```text
.env.example
```

with placeholder values only.

## Project Status

The project currently has a database-backed backend for Characters, Personas, Social Links, and music Tracks. More routes, models, and frontend integrations can be added as development continues.

## Disclaimer

This is a personal fan-made project based on the **Persona** series. Persona and related characters, music, artwork, and other intellectual property belong to their respective rights holders. This project is not affiliated with or endorsed by Atlus or SEGA.
