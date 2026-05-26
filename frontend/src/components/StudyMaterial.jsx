import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Plus, ChevronLeft, Link as LinkIcon, Loader, GraduationCap, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export default function StudyMaterial() {
  const { user } = useAuth();
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation states
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'books' or 'notes'

  // Input states
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialUrl, setNewMaterialUrl] = useState('');

  // Initial empty state for the 8 semesters
  const defaultData = {
    semesters: {
      1: { subjects: [] }, 2: { subjects: [] }, 3: { subjects: [] }, 4: { subjects: [] },
      5: { subjects: [] }, 6: { subjects: [] }, 7: { subjects: [] }, 8: { subjects: [] }
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchDB = async () => {
      try {
        const response = await fetch('https://major-project-h9qn.onrender.com/api/study-material/db');
        if (response.ok) {
          const data = await response.json();
          setDb(data);
        } else {
          // If 404 or error, fall back to local storage
          const saved = localStorage.getItem('STUDY_MATERIAL_DB');
          setDb(saved ? JSON.parse(saved) : defaultData);
        }
      } catch (err) {
        console.error("Fetch error", err);
        const saved = localStorage.getItem('STUDY_MATERIAL_DB');
        setDb(saved ? JSON.parse(saved) : defaultData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDB();
  }, []);

  const updateDb = async (newDb) => {
    setDb(newDb);
    localStorage.setItem('STUDY_MATERIAL_DB', JSON.stringify(newDb));
    try {
      await fetch('https://major-project-h9qn.onrender.com/api/study-material/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDb)
      });
    } catch (err) {
      console.error("Failed to sync DB to backend", err);
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;

    const newDb = { ...db };
    const newSubject = {
      id: 'subj_' + Date.now(),
      name: newSubjectName,
      books: [],
      notes: []
    };
    newDb.semesters[selectedSemester].subjects.push(newSubject);
    updateDb(newDb);
    setNewSubjectName('');
    toast.success("Subject added!");
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMaterialTitle.trim() || !newMaterialUrl.trim()) return;

    const newDb = { ...db };
    const sem = newDb.semesters[selectedSemester];
    const subj = sem.subjects.find(s => s.id === selectedSubject.id);
    
    if (subj) {
      subj[selectedType].push({
        id: 'mat_' + Date.now(),
        title: newMaterialTitle,
        url: newMaterialUrl,
        addedBy: user?.name || 'Anonymous',
        date: new Date().toISOString()
      });
      updateDb(newDb);
      setNewMaterialTitle('');
      setNewMaterialUrl('');
      
      setSelectedSubject(subj);
      toast.success("Material added successfully! 📚");
    }
  };

  if (isLoading || !db) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-blue-600 animate-pulse text-xl font-bold flex items-center space-x-3">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Study Portal...</span>
        </div>
      </div>
    );
  }

  const subjects = db.semesters[selectedSemester]?.subjects || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Study Material Portal</h1>
          </div>
          <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            Semester {selectedSemester} Active
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto w-full px-6 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar - Semesters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden sticky top-28">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Select Semester
              </h3>
            </div>
            <div className="p-2 space-y-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                const isActive = selectedSemester === sem;
                const count = db.semesters[sem]?.subjects?.length || 0;
                return (
                  <button 
                    key={sem}
                    onClick={() => {
                      setSelectedSemester(sem);
                      setSelectedSubject(null);
                      setSelectedType(null);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200/60'
                    }`}
                  >
                    <span className="font-bold">Semester {sem}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 space-y-6">
          
          {!selectedSubject ? (
            /* SUBJECTS VIEW */
            <div className="animate-fadeIn">
              {/* Add Subject Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full filter blur-xl"></div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center border-b border-slate-100 pb-4 mb-4">
                  <Plus className="w-5 h-5 text-blue-500 mr-2" />
                  Add New Subject
                </h2>
                <form onSubmit={handleAddSubject} className="flex items-center space-x-3">
                  <input 
                    type="text"
                    placeholder="Enter subject name..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                  />
                  <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center">
                    Add Subject
                  </button>
                </form>
              </div>

              {/* Subjects Grid */}
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">
                Semester {selectedSemester} Curriculum
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {subjects.length === 0 ? (
                  <div className="col-span-full bg-slate-50 border border-slate-200/80 rounded-2xl p-8 text-center">
                    <p className="text-slate-500">No subjects listed for Semester {selectedSemester} yet.</p>
                  </div>
                ) : (
                  subjects.map(subj => (
                    <button 
                      key={subj.id}
                      onClick={() => setSelectedSubject(subj)}
                      className="flex flex-col p-5 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
                    >
                      <h3 className="font-bold text-slate-800 text-lg mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {subj.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
                        <div className="flex space-x-3">
                          <span className="flex items-center text-xs font-semibold text-slate-500">
                            <BookOpen className="w-3 h-3 mr-1 text-blue-500" /> {subj.books.length}
                          </span>
                          <span className="flex items-center text-xs font-semibold text-slate-500">
                            <FileText className="w-3 h-3 mr-1 text-purple-500" /> {subj.notes.length}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* MATERIALS VIEW */
            <div className="animate-fadeIn">
              <button 
                onClick={() => { setSelectedSubject(null); setSelectedType(null); }} 
                className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors px-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Subjects
              </button>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedSubject.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">Semester {selectedSemester} Curriculum</p>
                </div>
              </div>

              {!selectedType ? (
                /* Select Type Split */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => setSelectedType('books')}
                    className="flex flex-col items-center justify-center p-10 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all group"
                  >
                    <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Reference Books</h3>
                    <p className="text-sm text-slate-500 mt-2 text-center">Browse or upload standard textbooks</p>
                    <div className="mt-4 px-4 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                      {selectedSubject.books.length} Items Available
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedType('notes')}
                    className="flex flex-col items-center justify-center p-10 bg-white border border-slate-200/80 rounded-2xl hover:border-purple-500 hover:shadow-xl transition-all group"
                  >
                    <div className="p-5 bg-purple-50 text-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Handwritten Notes</h3>
                    <p className="text-sm text-slate-500 mt-2 text-center">Class notes, summaries, and cheat sheets</p>
                    <div className="mt-4 px-4 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                      {selectedSubject.notes.length} Items Available
                    </div>
                  </button>
                </div>
              ) : (
                /* List & Upload View */
                <div className="animate-fadeIn">
                  <button 
                    onClick={() => setSelectedType(null)} 
                    className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors px-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Switch Material Type
                  </button>

                  {/* Upload Form */}
                  <div className="bg-slate-50/50 backdrop-blur border border-slate-200/80 rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                      {selectedType === 'books' ? <BookOpen className="w-4 h-4 mr-2 text-blue-500" /> : <FileText className="w-4 h-4 mr-2 text-purple-500" />}
                      Upload New {selectedType === 'books' ? 'Book' : 'Note'}
                    </h3>
                    <form onSubmit={handleAddMaterial} className="flex flex-col md:flex-row gap-3">
                      <input 
                        type="text"
                        placeholder="Title (e.g., Unit 1 PDF)"
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                        value={newMaterialTitle}
                        onChange={(e) => setNewMaterialTitle(e.target.value)}
                        required
                      />
                      <input 
                        type="url"
                        placeholder="Link (e.g., Google Drive URL)"
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                        value={newMaterialUrl}
                        onChange={(e) => setNewMaterialUrl(e.target.value)}
                        required
                      />
                      <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all">
                        Add Link
                      </button>
                    </form>
                  </div>

                  {/* Materials List */}
                  <div className="space-y-3">
                    {selectedSubject[selectedType].length === 0 ? (
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center">
                        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                          <LinkIcon className="w-5 h-5 text-slate-400" />
                        </div>
                        <h4 className="text-slate-800 font-bold mb-1">No Materials Yet</h4>
                        <p className="text-sm text-slate-500">Be the first to share a link for this subject!</p>
                      </div>
                    ) : (
                      selectedSubject[selectedType].map(mat => (
                        <a 
                          key={mat.id} 
                          href={mat.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2.5 rounded-xl ${selectedType === 'books' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                              {selectedType === 'books' ? <BookOpen className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{mat.title}</h4>
                              <p className="text-xs text-slate-500 font-medium">Shared by {mat.addedBy}</p>
                            </div>
                          </div>
                          <div className="p-2 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors">
                            <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
