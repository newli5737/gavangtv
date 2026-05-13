import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/matches — list matches, optional ?status=LIVE
router.get("/api/matches", async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status: status as any } : {};
    const matches = await prisma.match.findMany({
      where,
      include: { _count: { select: { comments: true, events: true } } },
      orderBy: { matchDate: "desc" },
    });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// GET /api/matches/:slug — single match with events
router.get("/api/matches/:slug", async (req, res) => {
  try {
    const match = await prisma.match.findUnique({
      where: { slug: req.params.slug },
      include: {
        events: { orderBy: { createdAt: "desc" } },
        _count: { select: { comments: true } },
      },
    });
    if (!match) { res.status(404).json({ error: "Match not found" }); return; }
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch match" });
  }
});

// GET /api/matches/:slug/comments — public comments for a match
router.get("/api/matches/:slug/comments", async (req, res) => {
  try {
    const match = await prisma.match.findUnique({ where: { slug: req.params.slug } });
    if (!match) { res.status(404).json({ error: "Match not found" }); return; }
    const comments = await prisma.comment.findMany({
      where: { matchId: match.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// POST /api/matches/:slug/comments — public user posts a comment
router.post("/api/matches/:slug/comments", async (req, res) => {
  try {
    const match = await prisma.match.findUnique({ where: { slug: req.params.slug } });
    if (!match) { res.status(404).json({ error: "Match not found" }); return; }
    const { username, message } = req.body;
    if (!username || !message) { res.status(400).json({ error: "username and message required" }); return; }
    const comment = await prisma.comment.create({
      data: { matchId: match.id, username, message, isFake: false },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

export default router;
