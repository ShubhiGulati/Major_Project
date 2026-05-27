import Experience from '../models/Experience.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../utils/inMemoryStore.js';

// Check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// @desc    Create new experience
// @route   POST /api/experiences
// @access  Private
export const createExperience = async (req, res) => {
  console.log('🔥 Create experience endpoint called');
  console.log('Request body:', req.body);
  console.log('User:', req.user);
  
  try {
    const experienceData = {
      user: req.user._id || req.user.id,
      ...req.body
    };

    let experience;

    if (isMongoConnected()) {
      experience = await Experience.create(experienceData);
      // Populate user details
      experience = await Experience.findById(experience._id).populate('user', 'name email');
    } else {
      // In-memory store
      experience = {
        _id: Date.now(),
        ...experienceData,
        user: req.user,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        views: 0
      };
      
      if (!global.inMemoryExperiences) {
        global.inMemoryExperiences = [];
      }
      global.inMemoryExperiences.push(experience);
    }

    console.log('✅ Experience created successfully');

    res.status(201).json({
      success: true,
      message: 'Experience shared successfully',
      experience
    });
  } catch (error) {
    console.error('❌ Error creating experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to share experience',
      error: error.message
    });
  }
};

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getAllExperiences = async (req, res) => {
  console.log('🔥 Get all experiences endpoint called');
  
  try {
    let experiences;

    if (isMongoConnected()) {
      experiences = await Experience.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(100);
    } else {
      // In-memory store
      if (!global.inMemoryExperiences) {
        global.inMemoryExperiences = [
          {
            _id: 'sample1',
            user: { _id: 'bot1', name: 'Aman Sharma', email: 'bot1@example.com' },
            name: "Aman Sharma",
            batch: "2024",
            department: "Computer Science",
            companyName: "Google",
            companyType: "core",
            package: "35 LPA",
            role: "Software Engineer",
            interviewRounds: "1 OA + 3 Tech + 1 HR",
            technicalQuestions: "- Graph algorithms (Dijkstra's)\n- System design of a chat application",
            hrQuestions: "Why do you want to work at Google?",
            tips: "Master dynamic programming and graphs. Keep communicating your thought process.",
            difficulty: "hard",
            createdAt: new Date(),
            likes: 12, views: 45
          },
          {
            _id: 'sample2',
            user: { _id: 'bot2', name: 'Priya Singh', email: 'bot2@example.com' },
            name: "Priya Singh",
            batch: "2023",
            department: "Electronics",
            companyName: "Texas Instruments",
            companyType: "core",
            package: "22 LPA",
            role: "Hardware Engineer",
            interviewRounds: "1 Online Test + 2 Tech Interviews + 1 Managerial",
            technicalQuestions: "- RC circuit transients\n- Operational amplifiers detailed design",
            hrQuestions: "Describe a project where you failed and what you learned.",
            tips: "Be very strong with your core subjects and circuit diagrams.",
            difficulty: "medium",
            createdAt: new Date(),
            likes: 8, views: 32
          },
          {
            _id: 'sample3',
            user: { _id: 'bot3', name: 'Rahul Verma', email: 'bot3@example.com' },
            name: "Rahul Verma",
            batch: "2024",
            department: "Information Technology",
            companyName: "TCS Digital",
            companyType: "non-core",
            package: "7.5 LPA",
            role: "System Engineer",
            interviewRounds: "1 Aptitude + 1 Tech + 1 HR",
            technicalQuestions: "- SQL Joins\n- OOPs concepts in Java\n- Reverse a string",
            hrQuestions: "Are you willing to relocate?",
            tips: "Basic DSA and strong OOPs concepts are enough.",
            difficulty: "easy",
            createdAt: new Date(),
            likes: 5, views: 18
          },
          {
            _id: 'sample4',
            user: { _id: 'bot4', name: 'Vanshika', email: 'vanshika@example.com' },
            name: "Vanshika",
            batch: "2024",
            department: "Computer Science",
            companyName: "Microsoft",
            companyType: "core",
            package: "51 LPA",
            role: "Software Engineer",
            interviewRounds: "1 OA + 3 Tech + 1 AA",
            technicalQuestions: "- DSA (Trees, Graphs, DP)\n- System Design",
            hrQuestions: "Why Microsoft?",
            tips: "Practice medium/hard leetcode questions.",
            difficulty: "hard",
            createdAt: new Date(),
            likes: 20, views: 80
          },
          {
            _id: 'sample5',
            user: { _id: 'bot5', name: 'Hitesh', email: 'hitesh@example.com' },
            name: "Hitesh",
            batch: "2024",
            department: "Information Technology",
            companyName: "Optum",
            companyType: "core",
            package: "15 LPA",
            role: "Software Engineer",
            interviewRounds: "1 OA + 2 Tech + 1 HR",
            technicalQuestions: "- DBMS Queries\n- React/Node.js concepts",
            hrQuestions: "What are your strengths and weaknesses?",
            tips: "Be very strong with CS fundamentals and your resume projects.",
            difficulty: "medium",
            createdAt: new Date(),
            likes: 15, views: 55
          }
        ];
      }
      experiences = global.inMemoryExperiences.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    console.log(`✅ Found ${experiences.length} experiences`);

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences
    });
  } catch (error) {
    console.error('❌ Error fetching experiences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences',
      error: error.message
    });
  }
};

// @desc    Get user's own experiences
// @route   GET /api/experiences/my
// @access  Private
export const getMyExperiences = async (req, res) => {
  console.log('🔥 Get my experiences endpoint called');
  console.log('User ID:', req.user._id || req.user.id);
  
  try {
    let experiences;

    if (isMongoConnected()) {
      experiences = await Experience.find({ user: req.user._id || req.user.id })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    } else {
      // In-memory store
      if (!global.inMemoryExperiences) {
        global.inMemoryExperiences = [];
      }
      const userId = req.user._id || req.user.id;
      experiences = global.inMemoryExperiences.filter(exp => 
        exp.user._id == userId || exp.user.id == userId
      ).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    console.log(`✅ Found ${experiences.length} experiences for user`);

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences
    });
  } catch (error) {
    console.error('❌ Error fetching user experiences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your experiences',
      error: error.message
    });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private (Own experiences + Admins)
export const deleteExperience = async (req, res) => {
  console.log('🔥 Delete experience endpoint called');
  console.log('Experience ID:', req.params.id);
  console.log('User role:', req.user.role);
  
  try {
    let experience;

    if (isMongoConnected()) {
      experience = await Experience.findById(req.params.id);
      
      if (!experience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }

      // Check if user is admin OR owns this experience
      const isAdmin = req.user.role === 'admin';
      const isOwner = experience.user.toString() === req.user._id.toString();
      
      if (!isAdmin && !isOwner) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this experience'
        });
      }

      await experience.deleteOne();
      console.log('✅ Experience deleted by', isAdmin ? 'admin' : 'owner');
    } else {
      // In-memory store
      if (!global.inMemoryExperiences) {
        global.inMemoryExperiences = [];
      }
      
      const index = global.inMemoryExperiences.findIndex(exp => exp._id == req.params.id);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }

      const userId = req.user._id || req.user.id;
      const isAdmin = req.user.role === 'admin';
      const isOwner = global.inMemoryExperiences[index].user._id == userId || 
                      global.inMemoryExperiences[index].user.id == userId;
      
      if (!isAdmin && !isOwner) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this experience'
        });
      }

      global.inMemoryExperiences.splice(index, 1);
      console.log('✅ Experience deleted by', isAdmin ? 'admin' : 'owner');
    }

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience',
      error: error.message
    });
  }
};
