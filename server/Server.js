import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mailRouter from "./routes/mailRouter.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ─── Middleware — order matters ───
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/contacts", contactRoutes);

// ─── Health check ───
app.get("/", (req, res) => res.json({ status: "Server is running 🚀" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});