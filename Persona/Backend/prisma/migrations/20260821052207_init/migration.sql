-- CreateTable
CREATE TABLE "personas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "arcana" TEXT NOT NULL,
    "originGame" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "affinities" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "arcana" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "appearances" TEXT NOT NULL,
    "personas" TEXT NOT NULL,
    "voiceActors" TEXT NOT NULL,
    "likes" TEXT NOT NULL,
    "dislikes" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "arcana" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" TEXT,
    "themeClass" TEXT NOT NULL,
    "embedId" TEXT NOT NULL,
    "boxArt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "personas_name_idx" ON "personas"("name");

-- CreateIndex
CREATE INDEX "personas_arcana_idx" ON "personas"("arcana");

-- CreateIndex
CREATE INDEX "personas_originGame_idx" ON "personas"("originGame");

-- CreateIndex
CREATE INDEX "characters_name_idx" ON "characters"("name");

-- CreateIndex
CREATE INDEX "characters_game_idx" ON "characters"("game");

-- CreateIndex
CREATE INDEX "characters_arcana_idx" ON "characters"("arcana");

-- CreateIndex
CREATE INDEX "social_links_name_idx" ON "social_links"("name");

-- CreateIndex
CREATE INDEX "social_links_game_idx" ON "social_links"("game");

-- CreateIndex
CREATE INDEX "social_links_arcana_idx" ON "social_links"("arcana");

-- CreateIndex
CREATE INDEX "tracks_title_idx" ON "tracks"("title");

-- CreateIndex
CREATE INDEX "tracks_game_idx" ON "tracks"("game");

-- CreateIndex
CREATE INDEX "tracks_category_idx" ON "tracks"("category");

-- CreateIndex
CREATE INDEX "tracks_artist_idx" ON "tracks"("artist");
