import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getUsers, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, authorize("ADMIN"), getUsers);
router.patch("/:id", protect, authorize("ADMIN"), updateUser);

export default router;

