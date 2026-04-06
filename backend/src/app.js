import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import prisma from "./utils/prisma.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { protect } from "./middleware/authMiddleware.js";
import { authorize } from "./middleware/roleMiddleware.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

// ✅ Health route (important for Render)
app.get("/", (req, res) => {
  res.send("Finance Manager API Running 🚀");
});

// ✅ Test routes
app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route working 🔥",
    user: req.user,
  });
});

app.get("/api/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Admin only access ✅" });
});

const __dirname = path.resolve();

// ✅ Serve frontend (optional, works fine on Render too)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ❌ REMOVE app.get("*")
// ✅ Replace with this (important fix)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("DB connected ✅");
  } catch (err) {
    console.error("DB connection failed ❌", err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();