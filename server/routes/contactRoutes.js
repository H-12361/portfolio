import express from "express";
// 1. Curly braces {} lagana zaroori hai agar named export hai
import { submitContact } from '../controller/contactController.js';

const router = express.Router();

// 2. Ab submitContact yahan directly kaam karega
router.post("/contact", submitContact);

export default router;