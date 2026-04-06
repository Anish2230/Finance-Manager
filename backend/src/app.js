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
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

const __dirname = path.resolve();

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


app.get("/", (req, res) => {
  res.send("Finance Manager API Running 🚀");
});


app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route working 🔥",
    user: req.user,
  });
});

app.get("/api/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Admin only access ✅" });
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

process.on('exit', (code) => { console.log('Process exiting with code:', code); });




