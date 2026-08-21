# Persona Website — Backend

The backend for the Persona Website Project. It provides the REST API used by the React frontend and stores Persona, character, Social Link, and music data in PostgreSQL.

## Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`
- Nodemon for development

## Project Structure

```text
Backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── lib/
│   │   └── prisma.js
│   ├── routes/
│   │   ├── personas.js
│   │   ├── characters.js
│   │   ├── socialLinks.js
│   │   └── music.js
│   └── server.js
├── .env
├── prisma.config.ts
├── package.json
└── README.md
```

## Database Models

### Persona

Stores:

- ID
- Name
- Arcana
- Origin game
- Description
- Images
- Elemental affinities

`affinities` is stored as JSON so the different affinity combinations can be preserved without creating a large number of fixed columns.

### Character

Stores:

- ID
- Name
- Game
- Arcana
- Image
- Title
- Birthday
- Appearances
- Personas
- Voice actors
- Likes
- Dislikes
- Profile
- Images

### SocialLink

Stores:

- ID
- Name
- Game
- Arcana
- Title
- Image
- Biography
- Availability
- Requirements

### Track

Stores:

- ID
- Title
- Game
- Category
- Artist
- Duration
- Theme class
- YouTube embed ID
- Box art

## Environment Variables

Create:

```text
Backend/.env
```

Add your PostgreSQL connection string:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3001
```

Do **not** commit `.env` or database credentials to GitHub.

## Installing the Backend

From the `Backend` directory:

```bash
npm install
```

The PostgreSQL adapter packages used by this project are:

```bash
npm install @prisma/adapter-pg pg
```

## Prisma 7 Configuration

This project uses Prisma 7.

Prisma 7 moved the database connection URL configuration out of the `datasource` block in `schema.prisma` and into `prisma.config.ts`.

The configuration should look similar to:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

## Database Setup

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Create and apply the initial migration

```bash
npx prisma migrate dev --name init
```

This creates the migration and synchronizes the PostgreSQL database with the Prisma schema.

### 3. Seed the database

```bash
npx prisma db seed
```

The seed script imports the project's existing frontend datasets:

```text
Frontend/src/data/personaDB.js
Frontend/src/data/characterDB.js
Frontend/src/data/socialLinkDB.js
Frontend/src/data/trackData.js
```

Because the frontend uses ES modules, the seed script dynamically imports the datasets and writes them to PostgreSQL.

The seed uses `upsert` operations so it can be run again without simply creating duplicate records.

### 4. Open Prisma Studio

```bash
npx prisma studio
```

This opens Prisma's database browser for inspecting the tables and records.

## How the Backend Was Built

The backend was rebuilt from scratch after the previous backend was removed.

### Step 1 — Create the Backend folder

A new `Backend` folder was created inside:

```text
Persona/
```

The backend was set up as a separate Node/Express application.

### Step 2 — Set up PostgreSQL

A PostgreSQL database was created through Prisma's hosted PostgreSQL service.

The PostgreSQL connection string was saved in:

```env
DATABASE_URL=...
```

inside `.env`.

The credential was kept out of the source code and should not be committed to GitHub.

### Step 3 — Configure Prisma

Prisma was installed and a `schema.prisma` file was created.

During setup, Prisma 7 reported that the old schema syntax:

```prisma
url = env("DATABASE_URL")
```

was no longer supported inside the datasource block. The connection URL was therefore moved to `prisma.config.ts`.

### Step 4 — Build the database schema from the frontend data folder

The existing frontend data files were used as the source of truth for the initial database design:

```text
personaDB.js     → Persona
characterDB.js   → Character
socialLinkDB.js  → SocialLink
trackData.js     → Track
```

The schema was designed to match the fields already used by the React project.

### Step 5 — Run the initial migration

The schema was applied with:

```bash
npx prisma migrate dev --name init
```

This created the initial PostgreSQL tables and migration files.

### Step 6 — Build the seed script

A `prisma/seed.js` script was created.

The seed script dynamically imports the frontend ES modules rather than manually copying all records into the backend.

It loads:

```text
personaDB
characterDB
socialLinkDB
TRACK_DATA
```

and seeds those records into PostgreSQL.

A few compatibility problems were encountered during this stage because the frontend package is configured as an ES module and Prisma 7's generated client layout differs from earlier Prisma versions. The final setup uses the PostgreSQL Prisma adapter and a CommonJS-compatible backend while dynamically importing the frontend ES-module data.

### Step 7 — Build the REST API

Express routes were created for:

```text
/api/personas
/api/characters
/api/social-links
/api/music
```

The API became the connection between React and PostgreSQL:

```text
Frontend
   ↓
HTTP request
   ↓
Express route
   ↓
Prisma Client
   ↓
PostgreSQL
```

### Step 8 — Create the frontend API helper

The frontend was given an API helper using:

```env
VITE_API_URL=http://localhost:3001
```

Pages that previously imported the local data directly were changed to request records from the backend.

### Step 9 — Convert the data-driven pages

The following pages were connected to the backend:

- Persona Compendium
- Characters
- Character Detail
- Social Links
- Social Link Detail
- Music

### Step 10 — Convert the music player

The music player was changed from importing `TRACK_DATA` directly to requesting:

```text
GET /api/music
```

The track IDs from PostgreSQL are used to keep the normal playback order, while the YouTube embed IDs remain responsible for playback.

The player retains its original controls, search, categories, autoplay, and Randomize on Finish behavior.

## Running the Project

You normally need two terminals.

### Terminal 1 — Backend

```bash
cd Persona/Backend
npm run dev
```

Backend:

```text
http://localhost:3001
```

### Terminal 2 — Frontend

```bash
cd Persona/Frontend
npm run dev
```

Open the Vite development URL shown in the frontend terminal.

## API Endpoints

### Personas

```http
GET /api/personas
GET /api/personas/:id
```

### Characters

```http
GET /api/characters
GET /api/characters/:id
```

### Social Links

```http
GET /api/social-links
GET /api/social-links/:id
```

### Music

```http
GET /api/music
GET /api/music/:id
```

## Useful Prisma Commands

Generate the client:

```bash
npx prisma generate
```

Create a migration:

```bash
npx prisma migrate dev --name <migration-name>
```

Seed the database:

```bash
npx prisma db seed
```

Open Prisma Studio:

```bash
npx prisma studio
```

Check migration status:

```bash
npx prisma migrate status
```

## Security Notes

Never commit:

```text
.env
```

or a PostgreSQL connection string containing credentials.

If a database connection string is ever exposed publicly, rotate the database credentials and update `DATABASE_URL`.

## Related Project

Frontend:

```text
../Frontend
```

The frontend is the React/Vite client that consumes this backend's REST API.
