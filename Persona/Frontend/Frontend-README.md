# Persona Frontend

The frontend for the Persona Website Project. It uses **React 19 + Vite**.

## Setup

From this directory:

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Vite will print the local URL in the terminal, normally `http://localhost:5173`.

## Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Current Stack

- React 19
- Vite 8
- React Router
- React Player
- React YouTube
- Sharp
- Oxlint

## Data Sources

The project currently contains source data for:

```text
src/data/characterDB.js
src/data/personaDB.js
src/data/socialLinkDB.js
src/data/trackData.js
```

These data files are also used by the backend seed to populate PostgreSQL.

## Backend Connection

The frontend should communicate with the backend API rather than connecting directly to PostgreSQL.

The current backend runs on port `3001`.

Example:

```js
const response = await fetch("http://localhost:3001/api/characters");
const characters = await response.json();
```

## Scripts

```text
npm run dev
npm run build
npm run lint
npm run preview
```
