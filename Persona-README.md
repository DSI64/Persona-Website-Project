# Persona Website Project

A full-stack Persona fan website built with a React/Vite frontend and an Express/Prisma backend connected to PostgreSQL.

## Project Structure

```text
Persona/
├── Backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   ├── routes/
│   │   │   ├── personas.js
│   │   │   ├── characters.js
│   │   │   ├── socialLinks.js
│   │   │   └── music.js
│   │   └── server.js
│   ├── .env
│   ├── prisma.config.ts
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── data/
│   │   ├── pages-jsx/
│   │   └── ...
│   ├── .env
│   └── package.json
│
├── package.json
└── README.md
```

## Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript / JSX
- CSS
- `react-youtube`

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`
- Nodemon

### Root Development Tool

- `concurrently` — starts the frontend and backend together

## Getting Started

### Prerequisites

Install Node.js and npm before starting the project.

You also need access to the PostgreSQL database used by the backend.

## Install Everything

From the root `Persona` directory, run:

```bash
npm install
```

The root `package.json` includes `concurrently` as a development dependency, so the command above automatically installs it.

After that, install the dependencies for the two applications:

```bash
npm install --prefix Backend
npm install --prefix Frontend
```

You can run all three commands in order, or install the root dependencies first and then the application dependencies.

## Environment Variables

### Backend

Create:

```text
Backend/.env
```

with:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3001
```

Do not commit the real database connection string to GitHub.

### Frontend

Create:

```text
Frontend/.env
```

with:

```env
VITE_API_URL=http://localhost:3001
```

## First-Time Backend Database Setup

The backend was rebuilt from scratch around the data that originally lived in the frontend.

From `Persona/Backend`:

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Create the database migration

```bash
npx prisma migrate dev --name init
```

### 3. Seed the database

```bash
npx prisma db seed
```

The seed script loads the existing frontend datasets and writes them into PostgreSQL:

```text
Frontend/src/data/personaDB.js     → Persona
Frontend/src/data/characterDB.js   → Character
Frontend/src/data/socialLinkDB.js  → SocialLink
Frontend/src/data/trackData.js     → Track
```

### 4. Optional: Open Prisma Studio

```bash
npx prisma studio
```

## Start the Entire Website

Once dependencies and the database are configured, go back to the root `Persona` directory and run:

```bash
npm run dev
```

This uses `concurrently` to start both applications:

```text
Frontend  → Vite
Backend   → Express / Nodemon
```

The backend runs on:

```text
http://localhost:3001
```

The frontend runs on the Vite development URL shown in the terminal, normally:

```text
http://localhost:5173
```

## Start Only One Side

Backend only:

```bash
npm run dev:backend
```

Frontend only:

```bash
npm run dev:frontend
```

## API Architecture

The frontend communicates with the backend instead of directly using the database.

```text
React / Vite
    ↓
api.js
    ↓
Express REST API
    ↓
Prisma
    ↓
PostgreSQL
```

### API Endpoints

#### Personas

```http
GET /api/personas
GET /api/personas/:id
```

#### Characters

```http
GET /api/characters
GET /api/characters/:id
```

#### Social Links

```http
GET /api/social-links
GET /api/social-links/:id
```

#### Music

```http
GET /api/music
GET /api/music/:id
```

## Main Frontend Features

### Persona Compendium

Persona information is loaded from PostgreSQL through the backend API, including Arcana, origin game, descriptions, images, and elemental affinities.

### Character Database

Character listings and character detail pages are API-backed and can be filtered by game and Arcana.

Persona 2 groups the two games together at the UI level:

```text
P2IS → Persona 2: Innocent Sin
P2EP → Persona 2: Eternal Punishment
```

Both are shown under the `Persona 2` filter.

### Social Links

Social Link listing and detail pages use backend data rather than directly reading the frontend database as their live source.

### Music Player

The music page loads its tracks from the backend and keeps the existing YouTube-based player functionality, including:

- Play / pause
- Previous / next
- Search
- Category browsing
- Volume control
- Autoplay Next Song
- Randomize on Finish
- YouTube background-tab playback behavior

## Backend Setup History

The backend was rebuilt from scratch after the original backend was removed.

### Step 1 — Create a new Backend folder

A new `Backend` application was created inside the `Persona` project.

### Step 2 — Set up PostgreSQL

A PostgreSQL database was created and its connection string was stored in `Backend/.env` as `DATABASE_URL`.

### Step 3 — Configure Prisma 7

Prisma was added to the backend. Because Prisma 7 changed datasource configuration, the connection URL was moved into `prisma.config.ts` instead of being placed directly in `schema.prisma`.

### Step 4 — Build the Prisma schema

The original frontend data files were used as the basis for the backend schema:

```text
personaDB.js
characterDB.js
socialLinkDB.js
trackData.js
```

These became the PostgreSQL models used by Prisma.

### Step 5 — Create the migration

The initial schema was applied with:

```bash
npx prisma migrate dev --name init
```

### Step 6 — Build the seed script

A `prisma/seed.js` file was created to import the frontend ES modules and insert their records into PostgreSQL.

The seed process uses `upsert` so the database can be reseeded without creating duplicate records.

### Step 7 — Build the API

Express routes were added for Personas, Characters, Social Links, and Music.

### Step 8 — Connect the frontend

The frontend gained an API helper and the main database-driven pages were converted to use the REST API instead of importing the frontend data arrays directly.

## Useful Commands

From the root:

```bash
npm install
npm run dev
npm run dev:backend
npm run dev:frontend
```

From `Backend`:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name <migration-name>
npx prisma db seed
npx prisma studio
npm run dev
```

From `Frontend`:

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Security

Never commit:

```text
Backend/.env
```

or any database credentials, API secrets, or other private environment values.

If a database credential is accidentally exposed, rotate it immediately and update the environment variable.

## License / Project Notes

This is a personal fan project centered on the Persona series. Persona and related intellectual property belong to their respective rights holders.
