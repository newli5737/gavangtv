import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchRoutes from "./routes/matches";
import adminRoutes from "./routes/admin";

dotenv.config();

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

// Public API
app.use(matchRoutes);

// Admin API
app.use(adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 GavangTV API running on http://localhost:${PORT}`);
});
