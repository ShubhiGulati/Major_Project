import MentorshipDB from "../models/MentorshipDB.js";
import mongoose from 'mongoose';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const getMentorshipDB = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      if (!global.inMemoryMentorshipDB) {
        return res.status(404).json({ message: "Mentorship DB not found" });
      }
      return res.json(global.inMemoryMentorshipDB);
    }
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
    if (!isMongoConnected()) {
      global.inMemoryMentorshipDB = req.body;
      return res.json({ message: "Mentorship DB updated successfully", data: global.inMemoryMentorshipDB });
    }
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
