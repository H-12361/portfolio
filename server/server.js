import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mailRouter from "./routes/mailRouter.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ─── CORS Fix ───
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-axipbup2y-h-12361s-projects.vercel.app",  // ← naya URL
  "https://portfolio-49f6fgzaw-h-12361s-projects.vercel.app",  // ← purana URL (rakhlo)
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman ke liye
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));
app.options("*", cors()); // Preflight requests handle karo

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/contacts", contactRoutes);

// ─── Health check ───
app.get("/", (req, res) => res.json({ status: "Server is running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});