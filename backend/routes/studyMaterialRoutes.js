import express from "express";
import { getStudyMaterialDB, updateStudyMaterialDB } from "../controllers/studyMaterialController.js";

const router = express.Router();

router.get("/db", getStudyMaterialDB);
router.post("/db", updateStudyMaterialDB);

export default router;
