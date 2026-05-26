import mongoose from "mongoose";

const mentorshipDBSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("MentorshipDB", mentorshipDBSchema);
