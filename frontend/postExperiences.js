import fs from 'fs';

const API_URL = 'https://major-project-h9qn.onrender.com/api';

const experiences = [
  {
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
  },
  {
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
  },
  {
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
  }
];

async function seed() {
  try {
    console.log('Registering bot user...');
    let token;
    let res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "Bot User", email: "bot5@example.com", password: "password123" })
    });
    
    let data = await res.json();
    if (!res.ok) {
      if (data.message === 'User with this email already exists') {
        res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: "bot5@example.com", password: "password123" })
        });
        data = await res.json();
      } else {
        throw new Error(data.message);
      }
    }
    
    token = data.token;
    console.log('Got token:', token ? 'Yes' : 'No');

    console.log('Posting experiences...');
    for (const exp of experiences) {
      const expRes = await fetch(`${API_URL}/experiences`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(exp)
      });
      console.log('Posted:', exp.companyName, expRes.status);
    }
    console.log('Done!');
  } catch (e) {
    console.error('Error:', e);
  }
}

seed();
