import express from "express";
import { create, getAll } from "../controllers/recordController.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteRecord } from "../controllers/recordController.js";
import { updateRecord } from "../controllers/recordController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN"), create);
router.get("/", protect, authorize("ANALYST", "ADMIN"), getAll);
router.delete("/:id", protect, authorize("ADMIN"), deleteRecord);
router.patch("/:id", protect, authorize("ADMIN"), updateRecord);

export default router;