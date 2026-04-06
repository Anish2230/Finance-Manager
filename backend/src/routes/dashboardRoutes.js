import express from "express";
import { getDashboardData,getSummary } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("ANALYST", "ADMIN"), getDashboardData);
router.get("/summary", protect, getSummary);

export default router;