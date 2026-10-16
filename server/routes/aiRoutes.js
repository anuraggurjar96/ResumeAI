import express from "express";
import {
  improveSummary,
  improveExperience,
  improveProject,
  suggestSkills,
  atsCheck,
  improveText,
} from "../controllers/aiController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All AI routes are protected — must be logged in
router.post("/improve-summary", protect, improveSummary);
router.post("/improve-experience", protect, improveExperience);
router.post("/improve-project", protect, improveProject);
router.post("/suggest-skills", protect, suggestSkills);
router.post("/ats-check", protect, atsCheck);
router.post("/improve", protect, improveText);

export default router;
