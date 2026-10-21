import express from "express";
import {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
  togglePublic,
  getPublicResume,
} from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route — must come BEFORE /:id to avoid conflicts
router.get("/public/:publicId", getPublicResume);

// Protected routes
router.post("/", protect, createResume);
router.get("/", protect, getMyResumes);
router.get("/my-resumes", protect, getMyResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);
router.post("/:id/toggle-public", protect, togglePublic);

export default router;