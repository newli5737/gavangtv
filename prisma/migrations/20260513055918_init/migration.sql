-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('UPCOMING', 'LIVE', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "leagueIcon" TEXT NOT NULL DEFAULT '⚽',
    "homeTeam" TEXT NOT NULL,
    "homeIcon" TEXT NOT NULL DEFAULT '🔴',
    "homeScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeam" TEXT NOT NULL,
    "awayIcon" TEXT NOT NULL DEFAULT '🔵',
    "awayScore" INTEGER NOT NULL DEFAULT 0,
    "minute" TEXT NOT NULL DEFAULT '0''',
    "status" "MatchStatus" NOT NULL DEFAULT 'UPCOMING',
    "hasStream" BOOLEAN NOT NULL DEFAULT false,
    "fakeViews" INTEGER NOT NULL DEFAULT 0,
    "matchDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isFake" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchEvent" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "team" TEXT,
    "player" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_slug_key" ON "Match"("slug");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "Match_matchDate_idx" ON "Match"("matchDate");

-- CreateIndex
CREATE INDEX "Comment_matchId_idx" ON "Comment"("matchId");

-- CreateIndex
CREATE INDEX "MatchEvent_matchId_idx" ON "MatchEvent"("matchId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
