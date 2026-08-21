# Persona Website — Frontend

The frontend for the Persona Website Project. It is a React single-page application built with Vite and provides the site's main user interface, including the Persona Compendium, character database, Social Links, soundtrack player, and other Persona-themed pages.

## Tech Stack

- React 19
- Vite
- React Router
- JavaScript / JSX
- `react-youtube` for the soundtrack player
- CSS
- REST API connection to the backend

## Project Structure

```text
Frontend/
├── public/
│   └── images/
├── src/
│   ├── api/
│   │   └── api.js
│   ├── data/
│   │   ├── characterDB.js
│   │   ├── personaDB.js
│   │   ├── socialLinkDB.js
│   │   └── trackData.js
│   ├── pages-jsx/
│   │   ├── Characters.jsx
│   │   ├── CharacterDetail.jsx
│   │   ├── Compendium.jsx
│   │   ├── Music.jsx
│   │   ├── SocialLinks.jsx
│   │   └── SocialLinkDetail.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- The Persona Website backend

### Install dependencies

From the `Frontend` directory:

```bash
npm install
```

### Configure the backend URL

Create:

```text
Frontend/.env
```

with:

```env
VITE_API_URL=http://localhost:3001
```

The API helper uses this value when communicating with the Express backend.

### Start the frontend

```bash
npm run dev
```

Vite will display the development URL in the terminal.

## Connecting to the Backend

The main data-driven pages now retrieve their live records through the REST API instead of directly using the frontend data files.

```text
React
  ↓
src/api/api.js
  ↓
Express REST API
  ↓
Prisma
  ↓
PostgreSQL
```

Main endpoints used by the frontend:

```text
GET /api/personas
GET /api/personas/:id

GET /api/characters
GET /api/characters/:id

GET /api/social-links
GET /api/social-links/:id

GET /api/music
GET /api/music/:id
```

## Main Features

### Persona Compendium

Retrieves Persona records from PostgreSQL through the backend. Supports searching, game filtering, Arcana information, descriptions, images, and elemental affinities.

### Character Database

Retrieves character records from the backend and supports game and Arcana filtering.

Persona 2 is grouped at the UI level so that:

```text
P2IS = Persona 2: Innocent Sin
P2EP = Persona 2: Eternal Punishment
```

appear together under the `Persona 2` filter.

### Social Links

The Social Link listing and detail pages use backend API records instead of directly reading the frontend database files.

### Music Player

The music page loads tracks from:

```text
GET /api/music
```

It supports:

- Play / pause
- Previous / next
- Volume control
- Search
- Category browsing
- YouTube playback
- Autoplay Next Song
- Randomize on Finish
- Background-tab playback support

Normal autoplay follows database track ID order. Randomize on Finish creates a randomized playback order when that setting is enabled.

## Building for Production

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Development Notes

The `src/data/` files remain useful as the original project data/reference source. The main pages now consume their live records through the backend API.

When adding or changing records, make sure the backend database schema/seed data and frontend field names remain compatible.

## Related Project

Backend:

```text
../Backend
```

The backend contains the Express API, Prisma schema, migrations, and seed process.
