import StudyMaterialDB from "../models/StudyMaterialDB.js";
import mongoose from 'mongoose';

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Initial empty state for the 8 semesters
const defaultData = {
  semesters: {
    1: { subjects: [] },
    2: { subjects: [] },
    3: { subjects: [] },
    4: { subjects: [] },
    5: { subjects: [] },
    6: { subjects: [] },
    7: { subjects: [] },
    8: { subjects: [] }
  }
};

export const getStudyMaterialDB = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      if (!global.inMemoryStudyMaterialDB) {
        global.inMemoryStudyMaterialDB = defaultData;
      }
      return res.json(global.inMemoryStudyMaterialDB);
    }

    let db = await StudyMaterialDB.findOne();
    if (!db) {
      // Auto-initialize if not found
      db = new StudyMaterialDB({ data: defaultData });
      await db.save();
    }
    res.json(db.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudyMaterialDB = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      global.inMemoryStudyMaterialDB = req.body;
      return res.json({ message: "Study Material DB updated successfully in memory", data: global.inMemoryStudyMaterialDB });
    }

    let db = await StudyMaterialDB.findOne();
    if (!db) {
      db = new StudyMaterialDB({ data: req.body });
    } else {
      db.data = req.body;
      db.markModified('data');
    }
    await db.save();
    res.json({ message: "Study Material DB updated successfully", data: db.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
