import mongoose from "mongoose";

const studyMaterialDBSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("StudyMaterialDB", studyMaterialDBSchema);
