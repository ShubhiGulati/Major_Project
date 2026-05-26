import express from "express";
import { getMentorshipDB, updateMentorshipDB } from "../controllers/mentorshipController.js";

const router = express.Router();

router.get("/db", getMentorshipDB);
router.post("/db", updateMentorshipDB);

export default router;
