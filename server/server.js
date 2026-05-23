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
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      /\.vercel\.app$/.test(origin) || 
      /\.vusercontent\.net$/.test(origin) ||
      origin === "http://localhost:5173"
    )
      return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));
app.options("*", cors());

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
