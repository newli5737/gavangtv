import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, generateToken } from "../middleware/auth";

const router = Router();

function slugify(home: string, away: string): string {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${clean(home)}-vs-${clean(away)}`;
}

// POST /api/admin/login
router.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = generateToken(username);
    res.json({ token, username });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// GET /api/admin/stats
router.get("/api/admin/stats", authMiddleware, async (_req, res) => {
  try {
    const [totalMatches, liveMatches, viewsResult, totalComments] = await Promise.all([
      prisma.match.count(),
      prisma.match.count({ where: { status: "LIVE" } }),
      prisma.match.aggregate({ _sum: { fakeViews: true } }),
      prisma.comment.count(),
    ]);
    res.json({
      totalMatches,
      liveMatches,
      totalViews: viewsResult._sum.fakeViews || 0,
      totalComments,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET /api/admin/matches
router.get("/api/admin/matches", authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    const where = status && status !== "ALL" ? { status: status as any } : {};
    const matches = await prisma.match.findMany({
      where,
      include: { _count: { select: { comments: true, events: true } } },
      orderBy: { matchDate: "desc" },
    });
    res.json(matches);
  } catch {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// POST /api/admin/matches
router.post("/api/admin/matches", authMiddleware, async (req, res) => {
  try {
    const data = req.body;
    let slug = slugify(data.homeTeam, data.awayTeam);
    // Ensure unique slug
    const existing = await prisma.match.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    const match = await prisma.match.create({
      data: { ...data, slug, matchDate: data.matchDate ? new Date(data.matchDate) : new Date() },
    });
    res.json(match);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create match" });
  }
});

// GET /api/admin/matches/:id
router.get("/api/admin/matches/:id", authMiddleware, async (req, res) => {
  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { events: { orderBy: { time: "asc" } }, _count: { select: { comments: true } } },
    });
    if (!match) { res.status(404).json({ error: "Not found" }); return; }
    res.json(match);
  } catch {
    res.status(500).json({ error: "Failed to fetch match" });
  }
});

// PUT /api/admin/matches/:id
router.put("/api/admin/matches/:id", authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    // Regenerate slug if teams changed
    if (data.homeTeam && data.awayTeam) {
      let slug = slugify(data.homeTeam, data.awayTeam);
      const existing = await prisma.match.findFirst({ where: { slug, NOT: { id } } });
      if (existing) slug = `${slug}-${Date.now()}`;
      data.slug = slug;
    }
    if (data.matchDate) data.matchDate = new Date(data.matchDate);
    const match = await prisma.match.update({ where: { id }, data });
    res.json(match);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update match" });
  }
});

// DELETE /api/admin/matches/:id
router.delete("/api/admin/matches/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.match.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete match" });
  }
});

// PATCH /api/admin/matches/:id/views — set fake views
router.patch("/api/admin/matches/:id/views", authMiddleware, async (req, res) => {
  try {
    const { fakeViews } = req.body;
    const match = await prisma.match.update({
      where: { id: parseInt(req.params.id) },
      data: { fakeViews: parseInt(fakeViews) || 0 },
    });
    res.json(match);
  } catch {
    res.status(500).json({ error: "Failed to update views" });
  }
});

// GET /api/admin/matches/:id/comments
router.get("/api/admin/matches/:id/comments", authMiddleware, async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { matchId: parseInt(req.params.id) },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// POST /api/admin/matches/:id/comments — add fake comment
router.post("/api/admin/matches/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { username, message, isVerified } = req.body;
    const comment = await prisma.comment.create({
      data: {
        matchId: parseInt(req.params.id),
        username,
        message,
        isVerified: isVerified || false,
        isFake: true,
      },
    });
    res.json(comment);
  } catch {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// DELETE /api/admin/comments/:id
router.delete("/api/admin/comments/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.comment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

// POST /api/admin/matches/:id/events — add event
router.post("/api/admin/matches/:id/events", authMiddleware, async (req, res) => {
  try {
    const event = await prisma.matchEvent.create({
      data: { matchId: parseInt(req.params.id), ...req.body },
    });
    res.json(event);
  } catch {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// DELETE /api/admin/events/:id
router.delete("/api/admin/events/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.matchEvent.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// ── BANNERS ──

// GET /api/admin/banners
router.get("/api/admin/banners", authMiddleware, async (_req, res) => {
  try {
    const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });
    res.json(banners);
  } catch {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

// POST /api/admin/banners
router.post("/api/admin/banners", authMiddleware, async (req, res) => {
  try {
    const banner = await prisma.banner.create({ data: req.body });
    res.json(banner);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create banner" });
  }
});

// PUT /api/admin/banners/:id
router.put("/api/admin/banners/:id", authMiddleware, async (req, res) => {
  try {
    const banner = await prisma.banner.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(banner);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update banner" });
  }
});

// DELETE /api/admin/banners/:id
router.delete("/api/admin/banners/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.banner.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

export default router;
