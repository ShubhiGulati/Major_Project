import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, CheckSquare, Code, Award, TrendingUp, 
  Plus, Link as LinkIcon, Play, CheckCircle, XCircle, AlertCircle, 
  BookOpen, ArrowRight, Clock, Shield, Activity, UserPlus, 
  RefreshCw, Briefcase, FileText, Check, ChevronRight, Mail
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';


// Seed mock database if not already present in localStorage
const SEED_DATABASE_KEY = 'dsamp_mentorship_db_v2';

const seedDatabase = () => {
  const existing = localStorage.getItem(SEED_DATABASE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch (e) {
      console.error("Failed to parse existing mentorship db, reseeding...", e);
    }
  }

  const initialDB = {
    mentors: [
      { id: "m1", name: "Shubhi", email: "shubhigulati25@gmail.com", year: 4, placement: "Google (SDE-1, 32 LPA)" },
      { id: "m4", name: "Krishu", email: "krishu21@gmail.com", year: 4, placement: "Atlassian (SDE, 35 LPA)" }
    ],
    mentees: [
      { id: "me1", name: "Karan Patel", email: "karandp.ee.23@nitj.ac.in", year: 3 },
      { id: "me2", name: "Ananya Sharma", email: "ananya.s@nitj.ac.in", year: 3 },
      { id: "me7", name: "Mohan", email: "mohan@gmail.com", year: 3 },
      { id: "me8", name: "Priya Singh", email: "priya.s@gmail.com", year: 3 }
    ],
    pairings: [
      { id: "p1", mentorId: "m1", menteeId: "me1" },
      { id: "p2", mentorId: "m1", menteeId: "me2" }
    ],
    meetings: [
      {
        id: "meet1",
        title: "DSA Strategies: Dynamic Programming & Recursion",
        mentorId: "m1",
        date: "2026-05-15",
        time: "16:00",
        description: "Getting comfortable with recurrence relations, memoization, and bottom-up DP.",
        link: "https://meet.google.com/abc-defg-hij",
        status: "completed"
      },
      {
        id: "meet3",
        title: "System Design Basics & Low-Level Design Concepts",
        mentorId: "m1",
        date: "2026-05-28",
        time: "17:00",
        description: "Understanding design patterns, clean code principles, and designing parking lots.",
        link: "https://meet.google.com/def-ghij-klm",
        status: "upcoming"
      },
      {
        id: "meet5",
        title: "Advanced System Design: Load Balancing & Scaling",
        mentorId: "m4",
        date: "2026-06-10",
        time: "18:00",
        description: "Deep dive into consistent hashing, database sharding, and real-world architecture examples.",
        link: "https://meet.google.com/abc-xyz-123",
        status: "upcoming"
      }
    ],
    attendance: [
      { id: "a1", meetingId: "meet1", menteeId: "me1", status: "present" },
      { id: "a2", meetingId: "meet1", menteeId: "me2", status: "present" }
    ],
    tests: [
      {
        id: "t1",
        title: "Week 1 DSA Test: Sliding Window & HashMaps",
        mentorId: "m1",
        duration: 60,
        description: "This test will evaluate your understanding of sliding window optimizations and HashMap lookups.",
        status: "active",
        questions: [
          {
            id: "q1",
            title: "Longest Substring Without Repeating Characters",
            description: "Given a string `s`, find the length of the longest substring without repeating characters.",
            difficulty: "Medium",
            points: 40,
            starterCode: `function longestSubstring(s) {\n  // Write your code here\n  let maxLength = 0;\n  let start = 0;\n  let charMap = new Map();\n  \n  for (let end = 0; end < s.length; end++) {\n    if (charMap.has(s[end])) {\n      start = Math.max(charMap.get(s[end]) + 1, start);\n    }\n    charMap.set(s[end], end);\n    maxLength = Math.max(maxLength, end - start + 1);\n  }\n  return maxLength;\n}`,
            testCases: [
              { input: '"abcabcbb"', expected: '3' },
              { input: '"bbbbb"', expected: '1' }
            ]
          },
          {
            id: "q2",
            title: "Two Sum",
            description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
            difficulty: "Easy",
            points: 20,
            starterCode: `function twoSum(nums, target) {\n  // Write your code here\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
            testCases: [
              { input: '[2, 7, 11, 15], 9', expected: '[0, 1]' }
            ]
          }
        ]
      },
      {
        id: "t3",
        title: "Graph Traversal & Shortest Path",
        mentorId: "m4",
        duration: 90,
        description: "Evaluate graph theory logic including BFS, DFS, and Dijkstra's fundamentals.",
        status: "active",
        questions: [
          {
            id: "q4",
            title: "Number of Islands",
            description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
            difficulty: "Medium",
            points: 50,
            starterCode: `function numIslands(grid) {\n  // Write your BFS/DFS here\n  return 0;\n}`,
            testCases: []
          }
        ]
      }
    ],
    submissions: [],
    feedbacks: []
  };

  localStorage.setItem(SEED_DATABASE_KEY, JSON.stringify(initialDB));
  return initialDB;
};

export default function DSAMPMentorship() {
  const { user } = useAuth();
  const [db, setDb] = useState(null);
  const [activeRole, setActiveRole] = useState('mentor'); // 'mentor' | 'mentee' | 'admin'
  const [currentMentorId, setCurrentMentorId] = useState('m1'); // Shubhi by default
  const [currentMenteeId, setCurrentMenteeId] = useState('me1'); // Karan Patel by default
  const [isLoading, setIsLoading] = useState(true);

  // Fetch DB on mount
  useEffect(() => {
    const fetchDB = async () => {
      try {
        const response = await fetch('https://major-project-h9qn.onrender.com/api/mentorship/db');
        if (response.ok) {
          const data = await response.json();
          setDb(data);
        } else {
          // If 404 or error, initialize with seed and push to DB
          const initialDb = seedDatabase();
          setDb(initialDb);
          await fetch('https://major-project-h9qn.onrender.com/api/mentorship/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialDb)
          });
        }
      } catch {
        console.error("Failed to fetch mentorship DB");
        // Fallback to local if backend is down
        const saved = localStorage.getItem(SEED_DATABASE_KEY);
        setDb(saved ? JSON.parse(saved) : seedDatabase());
      } finally {
        setIsLoading(false);
      }
    };
    fetchDB();
  }, []);

  useEffect(() => {
    if (!db) return; // Wait for DB to load

    if (user && user.email) {
      const email = user.email.toLowerCase();
      
      // Determine Role
      let role = 'mentee';
      if (
        user.role === 'admin' || 
        email === 'shubhigulati25@gmail.com' || 
        email === 'sudhakargarg62@gmail.com' ||
        email === 'shikha@gmail.com'
      ) {
        role = 'admin';
      } else if (
        email === 'krishu21@gmail.com' ||
        user.yearOfPlacement || 
        user.company || 
        db.mentors.some(m => m.email.toLowerCase() === email)
      ) {
        role = 'mentor';
      }
      
      setActiveRole(role);

      // Dynamically register / find in mock database
      if (role === 'mentor') {
        const found = db.mentors.find(m => m.email.toLowerCase() === email);
        if (found) {
          setCurrentMentorId(found.id);
        } else {
          // Dynamically add new mentor
          const newMentor = {
            id: 'm_dynamic_' + Date.now(),
            name: user.name || 'Mentor User',
            email: user.email,
            year: 4,
            placement: user.company ? `${user.company} (${user.position || 'SDE'})` : 'Placed Student'
          };
          setDb(prevDb => {
            const updated = {
              ...prevDb,
              mentors: [...prevDb.mentors, newMentor]
            };
            localStorage.setItem(SEED_DATABASE_KEY, JSON.stringify(updated));
            return updated;
          });
          setCurrentMentorId(newMentor.id);
        }
      } else if (role === 'mentee') {
        const found = db.mentees.find(me => me.email.toLowerCase() === email);
        if (found) {
          setCurrentMenteeId(found.id);
        } else {
          // Dynamically add new mentee
          const newMentee = {
            id: 'me_dynamic_' + Date.now(),
            name: user.name || 'Mentee User',
            email: user.email,
            year: 3
          };
          // Auto pair this new mentee with Shubhi (m1) so they have an active mentor
          const newPairing = {
            id: 'pair_dynamic_' + Date.now(),
            mentorId: 'm1',
            menteeId: newMentee.id
          };
          setDb(prevDb => {
            const updated = {
              ...prevDb,
              mentees: [...prevDb.mentees, newMentee],
              pairings: [...prevDb.pairings, newPairing]
            };
            localStorage.setItem(SEED_DATABASE_KEY, JSON.stringify(updated));
            return updated;
          });
          setCurrentMenteeId(newMentee.id);
        }
      }
    }
  }, [user, db?.mentors?.length, db?.mentees?.length]); // Re-run if user or base db arrays change

  // Admin Enrollment Form State
  const [enrollRole, setEnrollRole] = useState('mentee'); // 'mentor' | 'mentee'
  const [enrollName, setEnrollName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollPlacement, setEnrollPlacement] = useState('');
  const [adminRosterFilterMentorId, setAdminRosterFilterMentorId] = useState('');

  // Mentor Panel State
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDesc, setMeetingDesc] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingTargetMenteeIds, setMeetingTargetMenteeIds] = useState([]);
  const [momInputs, setMomInputs] = useState({}); // { meetingId: 'mom text' }

  // Mentor Feedback State
  const [feedbackMenteeId, setFeedbackMenteeId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  // Mentor Attendance Panel State
  const [selectedMeetingForAttendance, setSelectedMeetingForAttendance] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState({}); // { menteeId: 'present' | 'absent' }

  // Mentor Test Creation State
  const [testTitle, setTestTitle] = useState('');
  const [testDesc, setTestDesc] = useState('');
  const [testDeadline, setTestDeadline] = useState('');
  const [testLink, setTestLink] = useState('');

  // Mentor Performance Entry State
  const [evalTestId, setEvalTestId] = useState('');
  const [evalMenteeId, setEvalMenteeId] = useState('');
  const [evalScore, setEvalScore] = useState('');

  // Admin Panel State
  const [adminSelectedMentorId, setAdminSelectedMentorId] = useState('');
  const [adminSelectedMenteeId, setAdminSelectedMenteeId] = useState('');

  // Sync DB back to Backend
  const updateDb = async (newDb) => {
    setDb(newDb);
    localStorage.setItem(SEED_DATABASE_KEY, JSON.stringify(newDb));
    try {
      await fetch('https://major-project-h9qn.onrender.com/api/mentorship/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDb)
      });
    } catch (err) {
      console.error("Failed to sync DB to backend", err);
    }
  };

  // Reset database to initial seeds
  const handleResetDb = async () => {
    localStorage.removeItem(SEED_DATABASE_KEY);
    const newDb = seedDatabase();
    setDb(newDb);
    try {
      await fetch('https://major-project-h9qn.onrender.com/api/mentorship/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDb)
      });
      toast.success("Database restored to seed settings! 🔄");
    } catch (err) {
      toast.error("Failed to reset backend DB");
    }
  };

  if (isLoading || !db) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-indigo-600 animate-pulse text-xl font-bold flex items-center space-x-3">
          <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Mentorship Portal...</span>
        </div>
      </div>
    );
  }

  // Helper: Get paired mentees for a mentor
  const getPairedMentees = (mentorId) => {
    const matchedMenteeIds = db.pairings
      .filter(p => p.mentorId === mentorId)
      .map(p => p.menteeId);
    return db.mentees.filter(m => matchedMenteeIds.includes(m.id));
  };

  // Helper: Get paired mentor for a mentee
  const getPairedMentor = (menteeId) => {
    const pairing = db.pairings.find(p => p.menteeId === menteeId);
    if (!pairing) return null;
    return db.mentors.find(m => m.id === pairing.mentorId);
  };

  // Helper: Get attendance details for a mentee
  const getMenteeAttendanceStats = (menteeId) => {
    const mentor = getPairedMentor(menteeId);
    if (!mentor) return { rate: 0, total: 0, present: 0, absent: 0, logs: [] };

    // Get meetings conducted by this mentor
    const mentorMeetings = db.meetings.filter(m => m.mentorId === mentor.id);
    const mentorMeetingIds = mentorMeetings.map(m => m.id);

    // Find attendance records
    const records = db.attendance.filter(a => a.menteeId === menteeId && mentorMeetingIds.includes(a.meetingId));
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const total = records.length;
    const rate = total === 0 ? 100 : Math.round((present / total) * 100);

    const logs = mentorMeetings.map(meeting => {
      const record = records.find(r => r.meetingId === meeting.id);
      return {
        id: meeting.id,
        title: meeting.title,
        date: meeting.date,
        time: meeting.time,
        status: record ? record.status : 'scheduled' // 'present', 'absent' or 'scheduled' if meeting upcoming/no attendance taken yet
      };
    });

    return { rate, total, present, absent, logs };
  };

  // Helper: Get coding test submissions for a mentee
  const getMenteeTestResults = (menteeId) => {
    return db.submissions
      .filter(s => s.menteeId === menteeId)
      .map(s => {
        const test = db.tests.find(t => t.id === s.testId);
        return {
          id: s.id,
          testTitle: test ? test.title : "Deleted Test",
          score: s.score,
          maxScore: s.maxScore,
          status: s.status,
          date: s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : 'N/A'
        };
      });
  };

  // Action: Mentor schedules a meeting
  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    if (!meetingTitle || !meetingDate || !meetingTime || !meetingLink) {
      toast.error("Please fill in all mandatory meeting fields!");
      return;
    }

    const newMeeting = {
      id: 'meet_' + Date.now(),
      title: meetingTitle,
      mentorId: currentMentorId,
      date: meetingDate,
      time: meetingTime,
      description: meetingDesc || "No description provided.",
      link: meetingLink,
      status: "upcoming"
    };

    const newMeetings = [...db.meetings, newMeeting];
    updateDb({ ...db, meetings: newMeetings });

    // Reset Form
    setMeetingTitle('');
    setMeetingDate('');
    setMeetingTime('');
    setMeetingDesc('');
    setMeetingLink('');
    toast.success("Mentorship meeting scheduled successfully! 📅");
  };

  // Action: Select meeting for attendance and populate current attendance status
  const selectMeetingAttendance = (meetingId) => {
    setSelectedMeetingForAttendance(meetingId);
    const existingRecordsForMeeting = db.attendance.filter(a => a.meetingId === meetingId);
    
    const paired = getPairedMentees(currentMentorId);
    const initialRecords = {};
    paired.forEach(mentee => {
      const match = existingRecordsForMeeting.find(a => a.menteeId === mentee.id);
      initialRecords[mentee.id] = match ? match.status : 'present';
    });
    setAttendanceRecords(initialRecords);
  };

  // Action: Save Attendance
  const handleSaveAttendance = () => {
    if (!selectedMeetingForAttendance) return;

    // Filter out existing records for this meeting
    let filteredAttendance = db.attendance.filter(a => a.meetingId !== selectedMeetingForAttendance);

    // Create new records
    const newRecords = Object.entries(attendanceRecords).map(([menteeId, status]) => ({
      id: `a_${selectedMeetingForAttendance}_${menteeId}`,
      meetingId: selectedMeetingForAttendance,
      menteeId,
      status
    }));

    // Mark the meeting as completed in meetings list if it wasn't
    const updatedMeetings = db.meetings.map(m => {
      if (m.id === selectedMeetingForAttendance) {
        return { ...m, status: 'completed' };
      }
      return m;
    });

    const newAttendance = [...filteredAttendance, ...newRecords];
    updateDb({ ...db, attendance: newAttendance, meetings: updatedMeetings });
    toast.success("Attendance sheet saved successfully! 📝");
    setSelectedMeetingForAttendance('');
  };

  // Action: Mentor creates a coding test link
  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!testTitle || !testDesc || !testLink) {
      toast.error("Please fill in all test details!");
      return;
    }

    const newTest = {
      id: 'test_' + Date.now(),
      title: testTitle,
      mentorId: currentMentorId,
      deadline: testDeadline,
      description: testDesc,
      externalLink: testLink,
      status: "active",
      maxScore: 100 // Default max score for external tests
    };

    updateDb({
      ...db,
      tests: [...db.tests, newTest]
    });

    setTestTitle('');
    setTestDesc('');
    setTestDeadline('');
    setTestLink('');
    toast.success("External test link published for Mentees! 🔗");
  };

  // Action: Mentor enters mentee marks
  const handleEnterMarks = (e) => {
    e.preventDefault();
    if (!evalTestId || !evalMenteeId || !evalScore) {
      toast.error("Please select a test, mentee, and enter a score.");
      return;
    }
    
    let existingSubIndex = db.submissions.findIndex(s => s.testId === evalTestId && s.menteeId === evalMenteeId);
    let newSubmissions = [...db.submissions];
    const test = db.tests.find(t => t.id === evalTestId);
    const maxScore = test?.maxScore || 100;

    if (existingSubIndex >= 0) {
      newSubmissions[existingSubIndex] = {
        ...newSubmissions[existingSubIndex],
        score: Number(evalScore),
        maxScore: maxScore,
        status: "evaluated"
      };
    } else {
      newSubmissions.push({
        id: 'sub_' + Date.now(),
        testId: evalTestId,
        menteeId: evalMenteeId,
        score: Number(evalScore),
        maxScore: maxScore,
        status: "evaluated",
        submittedAt: new Date().toISOString()
      });
    }

    updateDb({ ...db, submissions: newSubmissions });
    setEvalScore('');
    toast.success("Mentee performance recorded successfully! 📈");
  };

  // Action: Mentor saves MOM for a meeting
  const handleSaveMom = (meetingId) => {
    const momText = momInputs[meetingId];
    if (!momText) return;
    updateDb({
      ...db,
      meetings: db.meetings.map(m => m.id === meetingId ? { ...m, mom: momText } : m)
    });
    toast.success("MOM saved successfully!");
  };

  // Action: Mentor submits feedback for a mentee
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackMenteeId || !feedbackText) {
      toast.error("Please select a mentee and enter feedback!");
      return;
    }
    const newFeedback = {
      id: 'f_' + Date.now(),
      mentorId: currentMentorId,
      menteeId: feedbackMenteeId,
      text: feedbackText,
      date: new Date().toISOString().split('T')[0]
    };
    updateDb({
      ...db,
      feedbacks: [...(db.feedbacks || []), newFeedback]
    });
    setFeedbackText('');
    setFeedbackMenteeId('');
    toast.success("Feedback submitted to mentee! 📝");
  };

  // Action: Admin enroll student
  const handleEnrollStudent = (e) => {
    e.preventDefault();
    if (!enrollName || !enrollEmail) {
      toast.error("Please provide Name and Email!");
      return;
    }

    const email = enrollEmail.toLowerCase();
    
    // Check if email already exists in either mentors or mentees
    const mentorExists = db.mentors.some(m => m.email.toLowerCase() === email);
    const menteeExists = db.mentees.some(me => me.email.toLowerCase() === email);
    
    if (mentorExists || menteeExists) {
      toast.error("A student with this email is already enrolled!");
      return;
    }

    if (enrollRole === 'mentor') {
      const newMentor = {
        id: 'm_enroll_' + Date.now(),
        name: enrollName,
        email: enrollEmail,
        year: 4,
        placement: enrollPlacement || 'Placement Details Pending'
      };
      updateDb({
        ...db,
        mentors: [...db.mentors, newMentor]
      });
      toast.success(`Successfully enrolled 4th Year Mentor: ${enrollName}! 🎓`);
    } else {
      const newMentee = {
        id: 'me_enroll_' + Date.now(),
        name: enrollName,
        email: enrollEmail,
        year: 3
      };
      updateDb({
        ...db,
        mentees: [...db.mentees, newMentee]
      });
      toast.success(`Successfully enrolled 3rd Year Mentee: ${enrollName}! 📚`);
    }

    // Reset Form
    setEnrollName('');
    setEnrollEmail('');
    setEnrollPlacement('');
  };

  // Action: Admin pairing mentor and mentee
  const handleAssignPairing = (e) => {
    e.preventDefault();
    if (!adminSelectedMentorId || !adminSelectedMenteeId) {
      toast.error("Please select both a Mentor and a Mentee!");
      return;
    }

    // Check if pairing already exists
    const exists = db.pairings.find(
      p => p.mentorId === adminSelectedMentorId && p.menteeId === adminSelectedMenteeId
    );

    if (exists) {
      toast.error("This mentor-mentee pairing already exists!");
      return;
    }

    // Remove existing pairing for this mentee if they have one (as each mentee has 1 mentor)
    const filteredPairings = db.pairings.filter(p => p.menteeId !== adminSelectedMenteeId);

    const newPairing = {
      id: 'pair_' + Date.now(),
      mentorId: adminSelectedMentorId,
      menteeId: adminSelectedMenteeId
    };

    updateDb({
      ...db,
      pairings: [...filteredPairings, newPairing]
    });

    toast.success("Mentorship pairing assigned and synchronized! 🤝");
  };

  // Helper variables for current user context
  const currentMentorObj = db.mentors.find(m => m.id === currentMentorId) || db.mentors[0];
  const currentMenteeObj = db.mentees.find(m => m.id === currentMenteeId) || db.mentees[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased pb-12">
      {/* Glow effects in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Header Area */}
      <div className="relative border-b border-slate-200 bg-slate-50/60 backdrop-blur-md px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Users className="text-slate-900 w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                  DSAMP Mentorship Portal
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 border border-slate-700 text-indigo-600 font-semibold uppercase tracking-wider">
                  E-SPARK Hub
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                Departmental Student Academic Mentorship Program for Electrical Engineering Students
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* System DB State reset */}
            <button 
              onClick={handleResetDb} 
              className="p-2 bg-slate-200 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-500 hover:text-slate-700 transition-all"
              title="Reset Mock Database"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            {/* Elegant Selector Tabs */}
            {!user ? (
              <div className="flex p-1 bg-slate-50 border border-slate-200 rounded-xl">
                {[
                  { id: 'mentor', label: 'Mentor Tab', role: 'Mentor' },
                  { id: 'mentee', label: 'Mentee Tab', role: 'Mentee' },
                  { id: 'admin', label: 'Admin Tab', role: 'Admin' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRole(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      activeRole === tab.id 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                  >
                    {tab.role}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider text-indigo-600">
                Authorized Role: {activeRole}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role Picker Helper Details (Simulating actual login selector) */}
      {!user ? (
        <div className="max-w-7xl mx-auto w-full px-6 mt-4">
          {activeRole === 'mentor' && (
            <div className="flex items-center justify-between bg-blue-950/20 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-blue-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Simulated Mentor Account: <strong>{currentMentorObj?.name}</strong> (4th Year, Placed at {currentMentorObj?.placement})</span>
              </div>
              <select
                value={currentMentorId}
                onChange={(e) => setCurrentMentorId(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              >
                {db.mentors.map(m => (
                  <option key={m.id} value={m.id}>Switch to: {m.name}</option>
                ))}
              </select>
            </div>
          )}

          {activeRole === 'mentee' && (
            <div className="flex items-center justify-between bg-purple-950/20 border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-purple-300">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-600 animate-bounce" />
                <span>Simulated Mentee Account: <strong>{currentMenteeObj?.name}</strong> (3rd Year, Mentor: {getPairedMentor(currentMenteeId)?.name || 'None Assigned'})</span>
              </div>
              <select
                value={currentMenteeId}
                onChange={(e) => setCurrentMenteeId(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-700 focus:outline-none focus:border-purple-500"
              >
                {db.mentees.map(m => (
                  <option key={m.id} value={m.id}>Switch to: {m.name}</option>
                ))}
              </select>
            </div>
          )}

          {activeRole === 'admin' && (
            <div className="flex items-center bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-sm text-amber-300">
              <Shield className="w-4 h-4 text-amber-600 mr-2" />
              <span>Administrator Control Dashboard: Manage pairings and view system diagnostics.</span>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto w-full px-6 mt-4">
          <div className="flex items-center justify-between bg-slate-50/40 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-600 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Authenticated as: <strong className="text-slate-900">{user.name}</strong> ({user.email})</span>
            </div>
            {activeRole === 'mentee' && (
              <span className="text-xs text-purple-600 font-semibold bg-purple-950/30 px-2.5 py-1 rounded-lg border border-purple-900/40">
                Mentor: {getPairedMentor(currentMenteeId)?.name || 'None Assigned'}
              </span>
            )}
            {activeRole === 'mentor' && (
              <span className="text-xs text-white font-semibold bg-blue-600 px-2.5 py-1 rounded-lg shadow-sm border border-blue-600">
                Mentees: {getPairedMentees(currentMentorId).length} Assigned
              </span>
            )}
            {activeRole === 'admin' && (
              <span className="text-xs text-amber-600 font-semibold bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-900/40">
                System Admin Status
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Role Content View */}
      <main className="max-w-7xl mx-auto w-full px-6 mt-6 flex-1">
        
        {/* ==================== MENTOR VIEW ==================== */}
        {activeRole === 'mentor' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-xl p-5 hover:border-slate-700 transition-all flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Assigned Mentees</p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">{getPairedMentees(currentMentorId).length}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-xl p-5 hover:border-slate-700 transition-all flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Meetings Conducted</p>
                  <p className="text-3xl font-extrabold text-emerald-600 mt-1">
                    {db.meetings.filter(m => m.mentorId === currentMentorId).length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-xl p-5 hover:border-slate-700 transition-all flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Active Coding Tests</p>
                  <p className="text-3xl font-extrabold text-purple-600 mt-1">
                    {db.tests.filter(t => t.mentorId === currentMentorId && t.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600">
                  <Code className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Mentor Actions Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Schedule Meeting */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full filter blur-xl"></div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                    <Calendar className="text-blue-400 w-5 h-5" />
                    <span>Conduct & Schedule Meeting</span>
                  </h2>

                  <form onSubmit={handleScheduleMeeting} className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Meeting Title</label>
                      <input 
                        type="text" 
                        required
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                        placeholder="e.g., Tree DFS and BFS Traversal Walkthrough"
                        className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Date</label>
                        <input 
                          type="date" 
                          required
                          value={meetingDate}
                          onChange={(e) => setMeetingDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none transition-all"
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Time</label>
                        <input 
                          type="time" 
                          required
                          value={meetingTime}
                          onChange={(e) => setMeetingTime(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none transition-all"
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Description / Notes</label>
                      <textarea 
                        value={meetingDesc}
                        onChange={(e) => setMeetingDesc(e.target.value)}
                        rows={2}
                        placeholder="Provide details on topics to prepare, prerequisite reading, or agendas..."
                        className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Meeting Room URL</label>
                      <input 
                        type="url" 
                        required
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="e.g. https://meet.google.com/abc-defg-hij"
                        className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-600 focus:outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Schedule Meeting Slot</span>
                    </button>
                  </form>
                </div>

                {/* Mentor Feedback Card */}
                <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                    <CheckSquare className="text-purple-600 w-5 h-5" />
                    <span>Provide Mentee Feedback</span>
                  </h2>
                  <form onSubmit={handleSubmitFeedback} className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Select Mentee</label>
                      <select
                        required
                        value={feedbackMenteeId}
                        onChange={(e) => setFeedbackMenteeId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-purple-500"
                      >
                        <option value="">-- Choose Mentee --</option>
                        {getPairedMentees(currentMentorId).map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Feedback</label>
                      <textarea
                        required
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows={3}
                        placeholder="Write constructive feedback for this mentee..."
                        className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                      Submit Feedback
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Attendance Logger & Meetings */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Attendance Tracker Dashboard Section */}
                <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6 relative">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                    <CheckSquare className="text-emerald-600 w-5 h-5" />
                    <span>Mentorship Attendance Register</span>
                  </h2>

                  {/* Attendance Meeting Selector */}
                  <div className="mb-4">
                    <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Select Mentorship Meeting</label>
                    <select
                      value={selectedMeetingForAttendance}
                      onChange={(e) => selectMeetingAttendance(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">-- Choose a meeting to mark attendance --</option>
                      {db.meetings
                        .filter(m => m.mentorId === currentMentorId)
                        .map(m => (
                          <option key={m.id} value={m.id}>
                            [{m.date}] {m.title} ({m.status === 'completed' ? 'Completed' : 'Upcoming'})
                          </option>
                        ))}
                    </select>
                  </div>

                  {selectedMeetingForAttendance ? (
                    <div className="bg-white/60 border border-slate-200 rounded-xl p-4 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Mentee Name</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Status Selection</span>
                      </div>

                      {getPairedMentees(currentMentorId).length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-4">No mentees assigned to you yet.</p>
                      ) : (
                        getPairedMentees(currentMentorId).map(mentee => (
                          <div key={mentee.id} className="flex items-center justify-between py-1.5">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{mentee.name}</p>
                              <p className="text-xs text-slate-500">{mentee.email}</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setAttendanceRecords({ ...attendanceRecords, [mentee.id]: 'present' })}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                  attendanceRecords[mentee.id] === 'present'
                                    ? 'bg-emerald-600 text-slate-900 border border-emerald-500'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-200 border border-slate-200'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => setAttendanceRecords({ ...attendanceRecords, [mentee.id]: 'absent' })}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                  attendanceRecords[mentee.id] === 'absent'
                                    ? 'bg-rose-600 text-slate-900 border border-rose-500'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-200 border border-slate-200'
                                }`}
                              >
                                Absent
                              </button>
                            </div>
                          </div>
                        ))
                      )}

                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          onClick={() => setSelectedMeetingForAttendance('')}
                          className="px-4 py-2 bg-slate-50 text-slate-500 border border-slate-200 hover:text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveAttendance}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow shadow-emerald-500/10 cursor-pointer"
                        >
                          Save Attendance Sheet
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl text-slate-500">
                      <CheckSquare className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                      <p className="text-sm">Select a meeting from the dropdown above to manage attendance logs.</p>
                    </div>
                  )}
                </div>

                {/* Scheduled Meetings list */}
                <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                    <Clock className="text-indigo-600 w-5 h-5" />
                    <span>My Scheduled Meetings ({db.meetings.filter(m => m.mentorId === currentMentorId).length})</span>
                  </h2>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {db.meetings.filter(m => m.mentorId === currentMentorId).length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-6">You have not scheduled any meetings yet.</p>
                    ) : (
                      db.meetings
                        .filter(m => m.mentorId === currentMentorId)
                        .map(meeting => (
                          <div key={meeting.id} className="p-4 bg-white/60 border border-slate-200 hover:border-slate-700 transition-all rounded-xl space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h3 className="text-sm font-bold text-slate-900 leading-tight">{meeting.title}</h3>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${
                                meeting.status === 'completed' 
                                  ? 'bg-slate-200 text-slate-500 border border-slate-700' 
                                  : 'bg-indigo-900/30 text-indigo-600 border border-indigo-200/40 animate-pulse'
                              }`}>
                                {meeting.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2">{meeting.description}</p>

                            <div className="pt-2 border-t border-slate-200/50">
                              <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase">Minutes of Meeting (MOM)</label>
                              <div className="flex space-x-2">
                                <textarea
                                  value={momInputs[meeting.id] !== undefined ? momInputs[meeting.id] : (meeting.mom || '')}
                                  onChange={(e) => setMomInputs({ ...momInputs, [meeting.id]: e.target.value })}
                                  placeholder="Enter MOM here (visible to mentees)..."
                                  className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 focus:outline-none focus:border-indigo-500"
                                  rows={1}
                                />
                                <button
                                  onClick={() => handleSaveMom(meeting.id)}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase font-bold rounded-lg transition-colors"
                                >
                                  Save
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-300 gap-2">
                              <div className="flex items-center space-x-3">
                                <span>📅 {meeting.date}</span>
                                <span>⏰ {meeting.time}</span>
                              </div>
                              
                              <a 
                                href={meeting.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-semibold"
                              >
                                <LinkIcon className="w-3.5 h-3.5" />
                                <span>Join Google Meet</span>
                              </a>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Test Creation Engine */}
            {/* Test Creation Engine */}
            <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                <Code className="text-purple-600 w-5 h-5" />
                <span>Mentee Assessment Engine</span>
              </h2>

              <form onSubmit={handleCreateTest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Test Title</label>
                    <input 
                      type="text" 
                      required
                      value={testTitle}
                      onChange={(e) => setTestTitle(e.target.value)}
                      placeholder="e.g. HackerRank Array Manipulation"
                      className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Deadline Date</label>
                    <input 
                      type="date" 
                      required
                      value={testDeadline}
                      onChange={(e) => setTestDeadline(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">External Test Link</label>
                  <input 
                    type="url" 
                    required
                    value={testLink}
                    onChange={(e) => setTestLink(e.target.value)}
                    placeholder="https://www.hackerrank.com/..."
                    className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Instructions for Mentees</label>
                  <textarea 
                    required
                    value={testDesc}
                    onChange={(e) => setTestDesc(e.target.value)}
                    rows={2}
                    placeholder="Provide details on which sections to complete, time limits, etc..."
                    className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-purple-500/10 flex items-center space-x-2 cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                    <span>Publish External Test Link</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Performance Entry UI */}
            <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6 mt-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                <TrendingUp className="text-emerald-600 w-5 h-5" />
                <span>Mentee Performance Entry</span>
              </h2>
              <form onSubmit={handleEnterMarks} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Test</label>
                  <select
                    required
                    value={evalTestId}
                    onChange={(e) => setEvalTestId(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-700"
                  >
                    <option value="">-- Choose Test --</option>
                    {db.tests.filter(t => t.mentorId === currentMentorId).map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Mentee</label>
                  <select
                    required
                    value={evalMenteeId}
                    onChange={(e) => setEvalMenteeId(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-700"
                  >
                    <option value="">-- Choose Mentee --</option>
                    {getPairedMentees(currentMentorId).map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Score (Out of 100)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={evalScore}
                    onChange={(e) => setEvalScore(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-700"
                  />
                </div>
                <div className="md:col-span-1">
                  <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow shadow-emerald-500/10">
                    Save Marks
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

                                                                {/* ==================== MENTEE VIEW ==================== */}
        {activeRole === 'mentee' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
                    Mentee Dashboard
                  </h1>
                  <p className="text-slate-500 text-sm md:text-base max-w-xl">
                    Track your mentorship progress, access coding assessments, and review feedback from your 4th-year mentor to accelerate your placement preparation.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-center px-4 border-r border-slate-100">
                    <p className="text-3xl font-black text-indigo-600">{getMenteeAttendanceStats(currentMenteeId).rate}%</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Attendance</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-3xl font-black text-blue-600">{getMenteeTestResults(currentMenteeId).length}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Tests Done</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column (Mentor & Feedback) */}
              <div className="xl:col-span-4 space-y-8">
                
                {/* Mentor Card */}
                {(() => {
                  const mentor = getPairedMentor(currentMenteeId);
                  return (
                    <div className="group relative overflow-hidden rounded-2xl bg-white border-t-[6px] border-t-indigo-600 border-l border-r border-b border-slate-200 p-7 transition-all duration-300 shadow-xl shadow-slate-200/80 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500">
                        <Award className="w-24 h-24 text-indigo-600" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-8">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-500/30">
                            {mentor ? mentor.name.charAt(0) : '?'}
                          </div>
                          <div>
                            <p className="text-[10px] text-indigo-600 uppercase tracking-widest font-black mb-1">Assigned Mentor</p>
                            <h3 className="text-xl font-black text-slate-900 leading-tight">{mentor ? mentor.name : 'Unassigned'}</h3>
                          </div>
                        </div>
                        
                        {mentor ? (
                          <div className="space-y-4">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 transition-colors group-hover:bg-indigo-50/50 group-hover:border-indigo-200">
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Email Contact</p>
                              <p className="text-sm text-slate-800 font-bold">{mentor.email}</p>
                            </div>
                            <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-200 transition-colors group-hover:bg-indigo-100/80">
                              <p className="text-[10px] text-indigo-600 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5"><Briefcase className="w-3 h-3" /> Placement Detail</p>
                              <p className="text-sm text-indigo-900 font-black">{mentor.placement}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">Please contact the administration to get a mentor assigned to you.</p>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Feedback Widget */}
                <div className="bg-white rounded-2xl border-t-[6px] border-t-emerald-500 border-l border-r border-b border-slate-200 p-7 shadow-xl shadow-slate-200/80 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
                  <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2 mb-6">
                    <CheckSquare className="text-emerald-500 w-6 h-6" />
                    <span>Mentor Feedback</span>
                  </h2>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {!(db.feedbacks) || db.feedbacks.filter(f => f.menteeId === currentMenteeId).length === 0 ? (
                      <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm text-slate-500 font-bold">No feedback received yet.</p>
                      </div>
                    ) : (
                      db.feedbacks.filter(f => f.menteeId === currentMenteeId).map(f => (
                        <div key={f.id} className="p-5 bg-emerald-50/80 rounded-xl border border-emerald-200 transition-all hover:bg-emerald-100 hover:border-emerald-300">
                          <p className="text-[10px] text-emerald-700 font-black uppercase tracking-wider mb-2">{f.date}</p>
                          <p className="text-sm text-slate-800 leading-relaxed font-bold">{f.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column (Meetings & Tests) */}
              <div className="xl:col-span-8 space-y-8">
                
                {/* Upcoming Meetings Grid */}
                <div className="bg-white rounded-2xl border-t-[6px] border-t-purple-600 border-l border-r border-b border-slate-200 p-8 shadow-xl shadow-slate-200/80 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                  <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2 mb-8">
                    <Calendar className="text-purple-600 w-7 h-7" />
                    <span>Upcoming Sessions</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      const mentor = getPairedMentor(currentMenteeId);
                      if (!mentor) return <p className="text-sm text-slate-500 col-span-2 font-medium">No mentor paired.</p>;
                      
                      const upcoming = db.meetings.filter(m => m.mentorId === mentor.id && m.status === 'upcoming');
                      
                      if (upcoming.length === 0) return (
                        <div className="col-span-2 bg-slate-50 rounded-2xl p-10 text-center border-2 border-dashed border-slate-200">
                          <p className="text-slate-500 font-bold">No upcoming sessions scheduled.</p>
                        </div>
                      );

                      return upcoming.map((meeting, idx) => (
                        <div key={meeting.id} className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border-2 ${idx === 0 ? 'bg-gradient-to-b from-purple-50 to-white border-purple-300 shadow-lg shadow-purple-500/20 hover:-translate-y-1 hover:border-purple-400' : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-1 hover:border-slate-300'}`}>
                          
                          <div className="flex justify-between items-start mb-5">
                            <span className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider ${idx === 0 ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                              Upcoming
                            </span>
                            <div className="text-right text-slate-600 text-xs font-black space-y-0.5">
                              <p className="text-purple-700 flex items-center gap-1.5 justify-end"><Calendar className="w-3.5 h-3.5"/> {meeting.date}</p>
                              <p className="flex items-center gap-1.5 justify-end"><Clock className="w-3.5 h-3.5"/> {meeting.time}</p>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-black leading-tight mb-2 text-slate-900">{meeting.title}</h3>
                          <p className="text-sm line-clamp-2 mb-6 text-slate-600 font-semibold">{meeting.description}</p>
                          
                          <a 
                            href={meeting.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${idx === 0 ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/30 hover:shadow-lg hover:shadow-purple-600/40' : 'bg-slate-800 text-white hover:bg-slate-900 shadow-md shadow-slate-800/20'}`}
                          >
                            <LinkIcon className="w-4 h-4" />
                            <span>Join Meeting</span>
                          </a>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Assessments Section */}
                <div className="bg-white rounded-2xl border-t-[6px] border-t-blue-500 border-l border-r border-b border-slate-200 shadow-xl shadow-slate-200/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
                  <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-white">
                    <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                      <Code className="text-blue-600 w-7 h-7" />
                      <span>Coding Assessments</span>
                    </h2>
                  </div>
                  
                  <div className="p-8">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span> Pending Action
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {db.tests.filter(t => t.status === 'active').length === 0 ? (
                            <p className="text-sm text-slate-500 font-bold col-span-2">No active tests right now.</p>
                          ) : (
                            db.tests.filter(t => t.status === 'active').map(test => {
                              const isDone = db.submissions.some(s => s.testId === test.id && s.menteeId === currentMenteeId);
                              if (isDone) return null;
                              return (
                                <div key={test.id} className="group p-6 bg-white rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
                                  <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-black text-slate-900 line-clamp-1 text-lg">{test.title}</h4>
                                    <span className="text-[10px] font-black text-rose-600 uppercase bg-rose-100 px-2.5 py-1 rounded-md whitespace-nowrap ml-2 border border-rose-200 shadow-sm shadow-rose-200/50">Active</span>
                                  </div>
                                  <p className="text-sm text-slate-600 line-clamp-2 mb-6 h-10 font-semibold">{test.description}</p>
                                  <a 
                                    href={test.externalLink || test.link || '#'} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="block w-full text-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black transition-all shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40"
                                  >
                                    Take Assessment Now
                                  </a>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div className="pt-8 border-t-2 border-dashed border-slate-200">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-emerald-500" /> Completed Tests
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {getMenteeTestResults(currentMenteeId).length === 0 ? (
                            <p className="text-sm text-slate-500 font-bold col-span-2">No completed tests yet.</p>
                          ) : (
                            getMenteeTestResults(currentMenteeId).map(res => (
                              <div key={res.id} className="p-5 bg-white rounded-xl border-2 border-slate-100 flex items-center justify-between hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <div className="pr-4">
                                  <p className="text-sm font-black text-slate-900 line-clamp-1">{res.testTitle}</p>
                                  <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Submitted: {res.date}</p>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0">
                                  <div className="flex items-baseline space-x-0.5">
                                    <span className="text-xl font-black text-emerald-600">{res.score}</span>
                                    <span className="text-xs text-slate-400 font-black">/{res.maxScore}</span>
                                  </div>
                                  <span className="text-[9px] text-emerald-700 font-black uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded mt-1 border border-emerald-200">Evaluated</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Past Meetings History */}
                <div className="bg-white rounded-2xl border-t-[6px] border-t-slate-700 border-l border-r border-b border-slate-200 p-8 shadow-xl shadow-slate-200/80 hover:shadow-2xl hover:shadow-slate-300 transition-all duration-300">
                  <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2 mb-6">
                    <Clock className="text-slate-600 w-6 h-6" />
                    <span>Past Sessions History</span>
                  </h2>
                  <div className="space-y-4">
                    {(() => {
                      const mentor = getPairedMentor(currentMenteeId);
                      if (!mentor) return null;
                      const past = db.meetings.filter(m => m.mentorId === mentor.id && m.status === 'completed');
                      if (past.length === 0) return <p className="text-sm text-slate-500 font-bold">No past sessions.</p>;
                      return past.map(meeting => (
                        <div key={meeting.id} className="p-5 bg-white rounded-xl border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all hover:border-slate-300 hover:shadow-md">
                          <div>
                            <h3 className="text-sm font-black text-slate-900">{meeting.title}</h3>
                            <p className="text-xs text-slate-500 mt-1 font-bold">{meeting.date} • {meeting.time}</p>
                          </div>
                          {meeting.mom && (
                            <div className="w-full sm:w-1/2 bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1.5">MOM Notes</p>
                              <p className="text-xs text-slate-700 line-clamp-2 font-semibold">{meeting.mom}</p>
                            </div>
                          )}
                        </div>
                      ));
                    })()}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
{/* ==================== ADMIN VIEW ==================== */}
        {activeRole === 'admin' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Global metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-xl p-5 hover:border-slate-700 transition-all flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Mentors (4th Yr)</p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">{db.mentors.length}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <Shield className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-xl p-5 hover:border-slate-700 transition-all flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Mentees (3rd Yr)</p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">{db.mentees.length}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-xl p-5 hover:border-slate-700 transition-all flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Groups Made</p>
                  <p className="text-3xl font-extrabold text-emerald-600 mt-1">{new Set(db.pairings.map(p => p.mentorId)).size}</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* pairing manager */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Student Enrollment Card */}
                <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-xl"></div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                    <UserPlus className="text-purple-600 w-5 h-5" />
                    <span>Enroll Mentor or Mentee</span>
                  </h2>

                  <form onSubmit={handleEnrollStudent} className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Enrollment Role</label>
                      <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setEnrollRole('mentee')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            enrollRole === 'mentee'
                              ? 'bg-purple-900/40 text-purple-600 border border-purple-800/40'
                              : 'text-slate-500 hover:text-slate-600'
                          }`}
                        >
                          3rd Year Mentee
                        </button>
                        <button
                          type="button"
                          onClick={() => setEnrollRole('mentor')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            enrollRole === 'mentor'
                              ? 'bg-blue-900/40 text-blue-400 border border-blue-800/40'
                              : 'text-slate-500 hover:text-slate-600'
                          }`}
                        >
                          4th Year Mentor
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        required
                        value={enrollName}
                        onChange={(e) => setEnrollName(e.target.value)}
                        placeholder="e.g. Mohan Kumar"
                        className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={enrollEmail}
                        onChange={(e) => setEnrollEmail(e.target.value)}
                        placeholder="e.g. mohankumar@nitj.ac.in"
                        className="w-full bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                      />
                    </div>

                    {enrollRole === 'mentor' && (
                      <div className="animate-fadeIn">
                        <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Placement / Company Details</label>
                        <input
                          type="text"
                          value={enrollPlacement}
                          onChange={(e) => setEnrollPlacement(e.target.value)}
                          placeholder="e.g. Google (SDE-1, 32 LPA)"
                          className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-purple-500/10 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Enroll Student Account</span>
                    </button>
                  </form>
                </div>

                {/* 2. Pairing / Group Creator Card */}
                <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-xl"></div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                    <UserPlus className="text-amber-600 w-5 h-5" />
                    <span>Assign Mentorship Pairings</span>
                  </h2>

                  <form onSubmit={handleAssignPairing} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Select 4th Year Mentor</label>
                    <select
                      value={adminSelectedMentorId}
                      onChange={(e) => setAdminSelectedMentorId(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                    >
                      <option value="">-- Choose Mentor --</option>
                      {db.mentors.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.placement.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wide">Select 3rd Year Mentee</label>
                    <select
                      value={adminSelectedMenteeId}
                      onChange={(e) => setAdminSelectedMenteeId(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                    >
                      <option value="">-- Choose Mentee --</option>
                      {db.mentees.map(m => {
                        const existingPair = db.pairings.find(p => p.menteeId === m.id);
                        const mentorLabel = existingPair 
                          ? ` (Currently Paired to: ${db.mentors.find(mt => mt.id === existingPair.mentorId)?.name})`
                          : " (Unpaired)";
                        return (
                          <option key={m.id} value={m.id}>
                            {m.name}{mentorLabel}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-2 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Synchronize Pairing Assignment</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Pairings directory list */}
            <div className="lg:col-span-7 bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                  <Activity className="text-indigo-600 w-5 h-5" />
                  <span>Mentorship Assignments Directory</span>
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        <th className="py-2.5 px-3">Group</th>
                        <th className="py-2.5 px-3">Mentor (4th Year)</th>
                        <th className="py-2.5 px-3">Company Details</th>
                        <th className="py-2.5 px-3">Mentees assigned (3rd Year)</th>
                        <th className="py-2.5 px-3 text-center">Meetings Conducted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-xs">
                      {db.mentors.map((mentor, index) => {
                        const assignedMentees = getPairedMentees(mentor.id);
                        const meetingsConducted = db.meetings.filter(m => m.mentorId === mentor.id).length;
                        return (
                          <tr key={mentor.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="py-3 px-3 font-bold text-emerald-600">Group {index + 1}</td>
                            <td className="py-3 px-3">
                              <p className="font-bold text-slate-900">{mentor.name}</p>
                              <p className="text-[10px] text-slate-500">{mentor.email}</p>
                            </td>
                            <td className="py-3 px-3 text-slate-600 font-semibold">{mentor.placement}</td>
                            <td className="py-3 px-3">
                              {assignedMentees.length === 0 ? (
                                <span className="text-slate-500 italic">None assigned</span>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {assignedMentees.map(me => (
                                    <span key={me.id} className="bg-indigo-50 text-indigo-700 border border-indigo-200/40 px-2 py-0.5 rounded text-[10px] font-bold">
                                      {me.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-bold text-indigo-600">
                              {meetingsConducted}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* directory profiles */}
            <div className="bg-slate-50/50 backdrop-blur border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 mb-4 space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Users className="text-purple-600 w-5 h-5" />
                  <span>3rd Year Students (Mentee Roster)</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Filter by Mentor:</span>
                  <select
                    value={adminRosterFilterMentorId}
                    onChange={(e) => setAdminRosterFilterMentorId(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Mentees</option>
                    <option value="unassigned">Unassigned Mentees</option>
                    {db.mentors.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {db.mentees.filter(mentee => {
                  if (!adminRosterFilterMentorId) return true; // Show all
                  const pairedMentor = getPairedMentor(mentee.id);
                  if (adminRosterFilterMentorId === 'unassigned') return !pairedMentor;
                  return pairedMentor && pairedMentor.id === adminRosterFilterMentorId;
                }).map(mentee => {
                  const stats = getMenteeAttendanceStats(mentee.id);
                  const mentor = getPairedMentor(mentee.id);
                  return (
                    <div key={mentee.id} className="p-4 bg-white/60 border border-slate-200 hover:border-slate-700 transition-all rounded-xl space-y-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{mentee.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{mentee.email}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50/60 p-2 rounded-lg border border-slate-300">
                        <div>
                          <p className="text-slate-500 font-semibold uppercase">Attendance</p>
                          <p className={`font-bold mt-0.5 ${stats.rate >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {stats.rate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-semibold uppercase">Mentor Paired</p>
                          <p className="text-slate-700 font-bold mt-0.5 truncate">{mentor ? mentor.name : 'Unpaired'}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Sandbox modal has been removed in favor of external test links */}

    </div>
  );
}
