import MentorshipDB from "../models/MentorshipDB.js";

export const getMentorshipDB = async (req, res) => {
  try {
    let db = await MentorshipDB.findOne();
    if (!db) {
      return res.status(404).json({ message: "Mentorship DB not found" });
    }
    res.json(db.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMentorshipDB = async (req, res) => {
  try {
    let db = await MentorshipDB.findOne();
    if (!db) {
      db = new MentorshipDB({ data: req.body });
    } else {
      db.data = req.body;
      db.markModified('data');
    }
    await db.save();
    res.json({ message: "Mentorship DB updated successfully", data: db.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
