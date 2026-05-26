import express from "express";
import { getSample } from "../controllers/sampleController.js";
import authRoutes from './authRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import mentorshipRoutes from './mentorshipRoutes.js';
import studyMaterialRoutes from './studyMaterialRoutes.js';

const router = express.Router();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Sample route
router.get("/sample", getSample);

// Auth routes
router.use('/auth', authRoutes);

// Experience routes
router.use('/experiences', experienceRoutes);

// Mentorship routes
router.use('/mentorship', mentorshipRoutes);

// Study Material routes
router.use('/study-material', studyMaterialRoutes);

export default router;
