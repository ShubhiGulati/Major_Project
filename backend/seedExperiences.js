import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Experience from './models/Experience.js';

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  
  // Find Mohan
  let mohan = await User.findOne({ email: 'mohan@gmail.com' });
  if (!mohan) {
    mohan = await User.findOne(); // fallback
  }

  // Find another user
  const otherUser = await User.findOne({ email: { $ne: 'mohan@gmail.com' } }) || mohan;

  const experiences = [
    {
      user: mohan._id,
      name: mohan.name || 'Mohan',
      batch: '2024',
      department: 'Electrical Engineering',
      companyName: 'Texas Instruments',
      companyType: 'core',
      package: '25 LPA',
      role: 'Analog Design Engineer',
      interviewRounds: '1 Online Assessment + 3 Technical Interviews + 1 HR Round',
      technicalQuestions: '- Explain operational amplifiers in detail.\n- Draw a bandgap reference circuit.\n- Questions on RC circuits and transient response.',
      hrQuestions: '- Why Texas Instruments?\n- Describe a challenging project you worked on.',
      tips: 'Focus heavily on network theory, analog electronics, and basic semiconductor physics. Practice drawing circuits quickly.',
      difficulty: 'hard',
      likes: 12,
      views: 45
    },
    {
      user: otherUser._id,
      name: 'Ravi Kumar',
      batch: '2023',
      department: 'Electrical Engineering',
      companyName: 'TCS Digital',
      companyType: 'non-core',
      package: '7.5 LPA',
      role: 'System Engineer',
      interviewRounds: '1 Aptitude/Coding Test + 1 Technical Interview + 1 HR Round',
      technicalQuestions: '- Write a program to reverse a string.\n- Explain OOPs concepts with real-world examples.\n- Basics of SQL queries.',
      hrQuestions: '- Are you willing to relocate?\n- Why IT sector despite being from EE?',
      tips: 'Basic DSA and strong OOPs concepts are enough. Be confident in HR.',
      difficulty: 'easy',
      likes: 8,
      views: 120
    },
    {
      user: otherUser._id,
      name: 'Sneha Gupta',
      batch: '2024',
      department: 'Electrical Engineering',
      companyName: 'L&T',
      companyType: 'core',
      package: '6.5 LPA',
      role: 'Graduate Engineer Trainee',
      interviewRounds: '1 Aptitude + 1 Group Discussion + 1 Technical/HR Interview',
      technicalQuestions: '- Questions on power systems and transformers.\n- Explain the working of induction motors.\n- Switchgear basics.',
      hrQuestions: '- Why L&T?\n- Where do you see yourself in 5 years?',
      tips: 'Core subjects like Machines and Power Systems are crucial. Read standard textbooks.',
      difficulty: 'medium',
      likes: 15,
      views: 89
    }
  ];

  await Experience.insertMany(experiences);
  console.log('Experiences seeded successfully');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
