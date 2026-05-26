import React from 'react';
import { Zap, TrendingUp, Building, Briefcase, Users, GraduationCap, Award, BookOpen } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Hero Section */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-2">
        <div className="flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-10">
          
          {/* Text Content */}
          <div className="flex-1 lg:pr-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
              <Zap className="text-blue-500" size={18} />
              <span className="text-blue-700 font-bold tracking-wide text-sm">Welcome to E-SPARK</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 leading-tight mb-6">
              Electrical Society for <br className="hidden xl:block"/> Progression, <br className="hidden xl:block"/> Academic Research & Knowledge
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-8 font-medium">
              Empowering the next generation of electrical engineers at NIT Jalandhar through mentorship, resources, and shared experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm flex-1">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800">500+</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Members</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm flex-1">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <GraduationCap className="text-emerald-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800">100%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Commitment</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Department Photo */}
          <div className="w-full lg:w-5/12 h-[400px] lg:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-slate-50">
            <img 
              src="https://cimages1.touristlink.com/data/cache/B/U/I/L/D/I/N/G/building-of-nitj_400_300.jpg" 
              alt="Department Building" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle inner shadow for depth, not a tint */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none" />
          </div>
          
        </div>
      </div>

      {/* Department Info & Picture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-md border border-indigo-100 mb-6 w-fit">
            <BookOpen className="text-indigo-600" size={16} />
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-widest">Our Department</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
            Department of Electrical Engineering
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            The Department of Electrical Engineering at NIT Jalandhar is dedicated to creating innovative thinkers and skilled professionals. We offer a comprehensive curriculum that balances theoretical foundations with practical, hands-on experience in modern laboratories.
          </p>
          <ul className="space-y-4">
            {[
              "State-of-the-art laboratories and research facilities.",
              "Expert faculty with extensive industry and academic experience.",
              "Strong alumni network across top core and non-core sectors.",
              "Focus on emerging technologies like renewable energy and smart grids."
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="text-blue-600 w-4 h-4" />
                </div>
                <span className="text-slate-700 font-semibold text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
          {/* Top Faculty */}
          <div className="w-full lg:w-5/12 flex flex-col space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">Top Faculty</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">NIT Jalandhar</span>
              </div>
              
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {/* Faculty 1 */}
                <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img src="https://www.nitj.ac.in/images/faculty/2007196244.jpg" alt="Faculty" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=K+S&background=e0e7ff&color=4f46e5"} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Dr. K. S. Nagla</h4>
                    <p className="text-xs text-slate-500 font-medium">Associate Professor & Head</p>
                  </div>
                </div>

                {/* Faculty 2 */}
                <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img src="https://www.nitj.ac.in/images/faculty/2007196280.jpg" alt="Faculty" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=A+K&background=e0e7ff&color=4f46e5"} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Dr. A. K. Jain</h4>
                    <p className="text-xs text-slate-500 font-medium">Professor</p>
                  </div>
                </div>

                {/* Faculty 3 */}
                <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img src="https://www.nitj.ac.in/images/faculty/2007196238.jpg" alt="Faculty" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=D+K&background=e0e7ff&color=4f46e5"} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Dr. Dilbag Singh</h4>
                    <p className="text-xs text-slate-500 font-medium">Professor</p>
                  </div>
                </div>
              </div>
              
              <a href="https://v1.nitj.ac.in/index.php/nitj_cinfo/Faculty/44" target="_blank" rel="noreferrer" className="mt-4 text-center text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                View All Faculty Members →
              </a>
            </div>
          </div>
      </div>

      {/* Placement Stats */}
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-60 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100 mb-4">
                <TrendingUp className="text-emerald-600" size={16} />
                <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Placement Record</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                Last Year Placement Statistics
              </h2>
            </div>
            <p className="text-slate-500 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
              Batch 2023-2024
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Total Companies */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 bg-indigo-100/50 w-24 h-24 rounded-full group-hover:scale-125 transition-transform duration-500 ease-out" />
              <Building className="text-indigo-600 w-8 h-8 mb-4 relative z-10" />
              <p className="text-4xl font-black text-slate-900 mb-1 relative z-10">52<span className="text-indigo-600 text-2xl">+</span></p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">Companies Visited</p>
            </div>

            {/* Core vs Non Core */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 bg-purple-100/50 w-24 h-24 rounded-full group-hover:scale-125 transition-transform duration-500 ease-out" />
              <Briefcase className="text-purple-600 w-8 h-8 mb-4 relative z-10" />
              <div className="flex items-end space-x-4 relative z-10 mb-1">
                <div>
                  <p className="text-2xl font-black text-slate-900">18</p>
                  <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Core</p>
                </div>
                <div className="w-px h-8 bg-slate-300" />
                <div>
                  <p className="text-2xl font-black text-slate-900">34</p>
                  <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Non-Core</p>
                </div>
              </div>
            </div>

            {/* Highest Package */}
            <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 bg-emerald-100/50 w-24 h-24 rounded-full group-hover:scale-125 transition-transform duration-500 ease-out" />
              <Award className="text-emerald-600 w-8 h-8 mb-4 relative z-10" />
              <p className="text-4xl font-black text-slate-900 mb-1 relative z-10">25<span className="text-emerald-600 text-lg ml-1">LPA</span></p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">Highest Package</p>
            </div>

            {/* Average Package */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 bg-amber-100/50 w-24 h-24 rounded-full group-hover:scale-125 transition-transform duration-500 ease-out" />
              <TrendingUp className="text-amber-600 w-8 h-8 mb-4 relative z-10" />
              <p className="text-4xl font-black text-slate-900 mb-1 relative z-10">8.5<span className="text-amber-600 text-lg ml-1">LPA</span></p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">Average Package</p>
            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-lg border border-slate-800">
            <p className="text-slate-300 font-medium text-sm max-w-3xl mx-auto">
              "Our department consistently achieves an outstanding placement rate of <strong className="text-white text-lg mx-1">85%+</strong>, with top recruiters from both core electrical/electronics sectors and leading IT/Software giants."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple check icon component for the list
const CheckCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default HomePage;
