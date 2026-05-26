const fs = require('fs');
const path = require('path');

const filePath = path.resolve('c:/Users/shubh/OneDrive/Desktop/tpo/Major_Project/frontend/src/pages/DSAMPMentorship.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const newUI = `        {/* ==================== MENTEE VIEW ==================== */}
        {activeRole === 'mentee' && (
          <div className="space-y-10 animate-fadeIn font-sans">
            
            {/* Top Dashboard Hero & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Welcome Hero */}
              <div className="lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-slate-900 text-white p-10 flex flex-col justify-center border border-slate-800 shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full filter blur-[80px] transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full filter blur-[60px] transform -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest text-indigo-200 uppercase mb-4 inline-block border border-white/10">Mentee Portal</span>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Welcome back.
                  </h1>
                  <p className="text-slate-300 text-base max-w-lg leading-relaxed">
                    Track your progress, access curated assessments, and collaborate with your 4th-year mentor to accelerate your career placement.
                  </p>
                </div>
              </div>

              {/* Highlighted Attendance Card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white shadow-2xl shadow-indigo-500/25 flex flex-col items-center justify-center text-center border border-indigo-400/30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative z-10 w-full flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative mb-4">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="60" cy="60" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                      <circle cx="60" cy="60" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="351" strokeDashoffset={351 - (351 * getMenteeAttendanceStats(currentMenteeId).rate) / 100} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" />
                    </svg>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-black">{getMenteeAttendanceStats(currentMenteeId).rate}%</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold tracking-wider uppercase text-indigo-100">Attendance Rate</h2>
                  <p className="text-sm text-indigo-200 mt-2 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                    {getMenteeTestResults(currentMenteeId).length} Assessments Completed
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column (Mentor Profile & Feedback) */}
              <div className="xl:col-span-4 space-y-8">
                
                {/* Premium Mentor Card */}
                {(() => {
                  const mentor = getPairedMentor(currentMenteeId);
                  return (
                    <div className="rounded-[2rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] relative">
                      {/* Banner Background */}
                      <div className="h-28 bg-gradient-to-r from-slate-100 to-slate-200 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,theme(colors.slate.300)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                      </div>
                      
                      <div className="px-8 pb-8 relative">
                        {/* Avatar */}
                        <div className="absolute -top-12 left-8 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center p-1 border border-slate-100 rotate-3 transition-transform hover:rotate-0 duration-300">
                          <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-inner">
                            {mentor ? mentor.name.charAt(0) : '?'}
                          </div>
                        </div>

                        <div className="pt-16">
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Assigned Mentor</p>
                          <h3 className="text-2xl font-extrabold text-slate-800 mb-6">{mentor ? mentor.name : 'Unassigned'}</h3>
                          
                          {mentor ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                  <Briefcase className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Placement</p>
                                  <p className="text-sm font-bold text-slate-700">{mentor.placement}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                  <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Contact</p>
                                  <p className="text-sm font-bold text-slate-700">{mentor.email}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">Please contact the administration to get a mentor assigned to you.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Elegant Feedback Widget */}
                <div className="rounded-[2rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-extrabold text-slate-800">Feedback Log</h2>
                    <div className="p-2 bg-emerald-50 rounded-xl">
                      <CheckSquare className="text-emerald-500 w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {!(db.feedbacks) || db.feedbacks.filter(f => f.menteeId === currentMenteeId).length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <CheckSquare className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500 font-medium">No feedback recorded yet.</p>
                      </div>
                    ) : (
                      db.feedbacks.filter(f => f.menteeId === currentMenteeId).map(f => (
                        <div key={f.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-0 last:pb-0">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">{f.date}</p>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm text-slate-700 font-medium leading-relaxed">
                            {f.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column (Sessions & Assessments) */}
              <div className="xl:col-span-8 space-y-8">
                
                {/* Sleek Upcoming Sessions */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-800">Upcoming Sessions</h2>
                      <p className="text-sm text-slate-500 mt-1 font-medium">Scheduled meetings with your mentor</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-2xl">
                      <Calendar className="text-indigo-500 w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      const mentor = getPairedMentor(currentMenteeId);
                      if (!mentor) return <p className="text-sm text-slate-500 col-span-2 font-medium">No mentor paired.</p>;
                      
                      const upcoming = db.meetings.filter(m => m.mentorId === mentor.id && m.status === 'upcoming');
                      
                      if (upcoming.length === 0) return (
                        <div className="col-span-2 bg-slate-50 rounded-2xl p-12 text-center border border-slate-100">
                          <p className="text-slate-500 font-medium">No sessions scheduled at the moment.</p>
                        </div>
                      );

                      return upcoming.map((meeting, idx) => (
                        <div key={meeting.id} className={\`group flex flex-col justify-between rounded-[1.5rem] p-6 transition-all duration-300 \${idx === 0 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:-translate-y-1' : 'bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1'}\`}>
                          
                          <div>
                            <div className="flex justify-between items-start mb-6">
                              <span className={\`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider \${idx === 0 ? 'bg-white/20 text-white backdrop-blur-sm border border-white/10' : 'bg-white text-slate-600 border border-slate-200 shadow-sm'}\`}>
                                Upcoming
                              </span>
                              <div className={\`text-right text-xs font-bold space-y-1 \${idx === 0 ? 'text-indigo-200' : 'text-slate-500'}\`}>
                                <p className="flex items-center gap-1.5 justify-end"><Calendar className="w-3.5 h-3.5"/> {meeting.date}</p>
                                <p className="flex items-center gap-1.5 justify-end"><Clock className="w-3.5 h-3.5"/> {meeting.time}</p>
                              </div>
                            </div>
                            
                            <h3 className={\`text-xl font-bold leading-tight mb-3 \${idx === 0 ? 'text-white' : 'text-slate-800'}\`}>{meeting.title}</h3>
                            <p className={\`text-sm line-clamp-2 mb-8 font-medium leading-relaxed \${idx === 0 ? 'text-indigo-100/80' : 'text-slate-500'}\`}>{meeting.description}</p>
                          </div>
                          
                          <a 
                            href={meeting.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={\`w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl text-sm font-bold transition-all \${idx === 0 ? 'bg-white text-indigo-900 hover:bg-indigo-50' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}\`}
                          >
                            <LinkIcon className="w-4 h-4" />
                            <span>Join Video Call</span>
                          </a>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Minimalist Assessments Section */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-800">Coding Assessments</h2>
                      <p className="text-sm text-slate-500 mt-1 font-medium">Your assigned tests and submissions</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-2xl">
                      <Code className="text-blue-500 w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="space-y-10">
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> Action Required
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {db.tests.filter(t => t.status === 'active').length === 0 ? (
                            <div className="col-span-2 bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
                              <p className="text-sm text-slate-500 font-medium">No active tests right now.</p>
                            </div>
                          ) : (
                            db.tests.filter(t => t.status === 'active').map(test => {
                              const isDone = db.submissions.some(s => s.testId === test.id && s.menteeId === currentMenteeId);
                              if (isDone) return null;
                              return (
                                <div key={test.id} className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between items-start mb-4">
                                      <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <Code className="w-5 h-5" />
                                      </span>
                                      <span className="text-[9px] font-black text-rose-600 uppercase bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">Pending</span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 line-clamp-1 text-lg mb-2">{test.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">{test.description}</p>
                                  </div>
                                  <a 
                                    href={test.externalLink || test.link || '#'} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="block w-full text-center py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all shadow-md"
                                  >
                                    Take Assessment
                                  </a>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-slate-400" /> Completed
                        </h3>
                        <div className="space-y-4">
                          {getMenteeTestResults(currentMenteeId).length === 0 ? (
                            <p className="text-sm text-slate-500 font-medium">No completed tests yet.</p>
                          ) : (
                            getMenteeTestResults(currentMenteeId).map(res => (
                              <div key={res.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-white hover:border-slate-200 hover:shadow-md transition-all">
                                <div className="pr-4 flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                                    <Award className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{res.testTitle}</p>
                                    <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-wider">Submitted: {res.date}</p>
                                  </div>
                                </div>
                                <div className="flex items-baseline space-x-1 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                                  <span className="text-lg font-black text-emerald-500">{res.score}</span>
                                  <span className="text-xs text-slate-400 font-bold">/{res.maxScore}</span>
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
                <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-800">Past Sessions</h2>
                      <p className="text-sm text-slate-500 mt-1 font-medium">History of your completed meetings</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      const mentor = getPairedMentor(currentMenteeId);
                      if (!mentor) return null;
                      const past = db.meetings.filter(m => m.mentorId === mentor.id && m.status === 'completed');
                      if (past.length === 0) return <p className="text-sm text-slate-500 font-medium bg-slate-50 p-6 rounded-2xl text-center border border-slate-100">No past sessions.</p>;
                      return past.map(meeting => (
                        <div key={meeting.id} className="p-5 bg-white rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all hover:border-slate-200 hover:shadow-md">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                              <CheckSquare className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-slate-800">{meeting.title}</h3>
                              <p className="text-xs text-slate-400 mt-1 font-medium">{meeting.date} • {meeting.time}</p>
                            </div>
                          </div>
                          {meeting.mom && (
                            <div className="w-full sm:w-1/2 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1.5">MOM Notes</p>
                              <p className="text-xs text-slate-700 line-clamp-2 font-medium leading-relaxed">{meeting.mom}</p>
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
`;

const startIndex = content.indexOf('{/* ==================== MENTEE VIEW ==================== */}');
const endIndex = content.indexOf('{/* ==================== ADMIN VIEW ==================== */}');

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.slice(0, startIndex);
    const after = content.slice(endIndex);
    content = before + newUI + after;
    fs.writeFileSync(filePath, content);
    console.log('Successfully updated Mentee UI.');
} else {
    console.error('Could not find Mentee or Admin view markers.');
}
