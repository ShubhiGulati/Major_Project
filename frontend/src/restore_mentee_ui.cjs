const fs = require('fs');
const path = require('path');

const filePath = path.resolve('c:/Users/shubh/OneDrive/Desktop/tpo/Major_Project/frontend/src/pages/DSAMPMentorship.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const newUI = `        {/* ==================== MENTEE VIEW ==================== */}
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
                        <div key={meeting.id} className={\`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border-2 \${idx === 0 ? 'bg-gradient-to-b from-purple-50 to-white border-purple-300 shadow-lg shadow-purple-500/20 hover:-translate-y-1 hover:border-purple-400' : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-1 hover:border-slate-300'}\`}>
                          
                          <div className="flex justify-between items-start mb-5">
                            <span className={\`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider \${idx === 0 ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}\`}>
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
                            className={\`w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all \${idx === 0 ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/30 hover:shadow-lg hover:shadow-purple-600/40' : 'bg-slate-800 text-white hover:bg-slate-900 shadow-md shadow-slate-800/20'}\`}
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
`;

const startIndex = content.indexOf('{/* ==================== MENTEE VIEW ==================== */}');
const endIndex = content.indexOf('{/* ==================== ADMIN VIEW ==================== */}');

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.slice(0, startIndex);
    const after = content.slice(endIndex);
    content = before + newUI + after;
    fs.writeFileSync(filePath, content);
    console.log('Successfully reverted Mentee UI.');
} else {
    console.error('Could not find Mentee or Admin view markers.');
}
