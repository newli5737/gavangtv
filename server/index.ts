import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import matchRoutes from "./routes/matches";
import adminRoutes from "./routes/admin";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://gavangtv.weblon.click",
    "https://api-gavangtv.weblon.click",
  ],
  credentials: true,
}));
app.use(express.json());

// Serve HLS static files with proper CORS and content-type headers
app.use("/hls", express.static(path.join(__dirname, "public/hls"), {
  setHeaders: (res, filePath) => {
    // Set correct MIME types for HLS
    if (filePath.endsWith(".m3u8")) {
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    } else if (filePath.endsWith(".ts")) {
      res.setHeader("Content-Type", "video/mp2t");
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=31536000");
  },
}));

// Public API
app.use(matchRoutes);

// Admin API
app.use(adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 GavangTV API running on http://localhost:${PORT}`);
});
