import React, { useState } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, Building2, Mail, Linkedin, Filter, Phone, X, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const alumniData = [
  {
    id: 1,
    name: "Aarav Sharma",
    domain: "Software",
    role: "Senior Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    batch: "2019",
    image: "https://ui-avatars.com/api/?name=Aarav+Sharma&background=0D8ABC&color=fff",
    linkedin: "#",
    email: "aarav@example.com",
    phone: "+91 9876543210",
    openings: [
      { id: 101, title: "SDE-II Backend", location: "Bangalore", type: "Full-Time", date: "Posted 2 days ago" },
      { id: 102, title: "Frontend Internship", location: "Remote", type: "Internship", date: "Posted 1 week ago" }
    ]
  },
  {
    id: 2,
    name: "Riya Patel",
    domain: "Data",
    role: "Data Scientist",
    company: "Amazon",
    location: "Seattle, WA",
    batch: "2020",
    image: "https://ui-avatars.com/api/?name=Riya+Patel&background=8B5CF6&color=fff",
    linkedin: "#",
    email: "riya@example.com",
    phone: "+1 2065550198",
    openings: [
      { id: 201, title: "Machine Learning Engineer", location: "Seattle, WA", type: "Full-Time", date: "Posted 3 days ago" }
    ]
  },
  {
    id: 3,
    name: "Vikram Singh",
    domain: "Finance",
    role: "Investment Banker",
    company: "Goldman Sachs",
    location: "Mumbai, India",
    batch: "2018",
    image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=10B981&color=fff",
    linkedin: "#",
    email: "vikram@example.com",
    phone: "+91 8765432109",
    openings: []
  },
  {
    id: 4,
    name: "Neha Gupta",
    domain: "Research",
    role: "Research Scientist",
    company: "MIT Media Lab",
    location: "Cambridge, MA",
    batch: "2017",
    image: "https://ui-avatars.com/api/?name=Neha+Gupta&background=F59E0B&color=fff",
    linkedin: "#",
    email: "neha@example.com",
    phone: "+1 6175550123",
    openings: [
      { id: 401, title: "Research Assistant (AI)", location: "Cambridge, MA", type: "Contract", date: "Posted 5 days ago" }
    ]
  },
  {
    id: 5,
    name: "Karan Mehta",
    domain: "MBA",
    role: "Product Manager",
    company: "Microsoft",
    location: "Hyderabad, India",
    batch: "2018",
    image: "https://ui-avatars.com/api/?name=Karan+Mehta&background=EF4444&color=fff",
    linkedin: "#",
    email: "karan@example.com",
    phone: "+91 7654321098",
    openings: [
      { id: 501, title: "PM-I (Azure)", location: "Hyderabad", type: "Full-Time", date: "Posted 1 day ago" }
    ]
  },
  {
    id: 6,
    name: "Priya Desai",
    domain: "Software",
    role: "Frontend Developer",
    company: "Atlassian",
    location: "Sydney, Australia",
    batch: "2021",
    image: "https://ui-avatars.com/api/?name=Priya+Desai&background=EC4899&color=fff",
    linkedin: "#",
    email: "priya@example.com",
    phone: "+61 400123456",
    openings: []
  },
  {
    id: 7,
    name: "Rahul Verma",
    domain: "Data",
    role: "Machine Learning Engineer",
    company: "Meta",
    location: "London, UK",
    batch: "2020",
    image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=6366F1&color=fff",
    linkedin: "#",
    email: "rahul@example.com",
    phone: "+44 7700900077",
    openings: [
      { id: 701, title: "Data Analyst", location: "London (Hybrid)", type: "Full-Time", date: "Posted 2 weeks ago" }
    ]
  },
  {
    id: 8,
    name: "Ananya Reddy",
    domain: "MBA",
    role: "Management Consultant",
    company: "McKinsey & Company",
    location: "Delhi, India",
    batch: "2016",
    image: "https://ui-avatars.com/api/?name=Ananya+Reddy&background=14B8A6&color=fff",
    linkedin: "#",
    email: "ananya@example.com",
    phone: "+91 9988776655",
    openings: [
      { id: 801, title: "Business Analyst Intern", location: "Delhi", type: "Internship", date: "Posted 4 days ago" }
    ]
  }
];

const domains = ["All", "Software", "Data", "Finance", "Research", "MBA"];

const getDomainColor = (domain) => {
  switch(domain) {
    case 'Software': return 'from-blue-500 to-cyan-400 text-blue-700 bg-blue-50 border-blue-200';
    case 'Data': return 'from-purple-500 to-fuchsia-400 text-purple-700 bg-purple-50 border-purple-200';
    case 'Finance': return 'from-emerald-500 to-teal-400 text-emerald-700 bg-emerald-50 border-emerald-200';
    case 'Research': return 'from-amber-500 to-orange-400 text-amber-700 bg-amber-50 border-amber-200';
    case 'MBA': return 'from-rose-500 to-pink-400 text-rose-700 bg-rose-50 border-rose-200';
    default: return 'from-slate-500 to-slate-400 text-slate-700 bg-slate-50 border-slate-200';
  }
};

const AlumniContact = () => {
  const [activeDomain, setActiveDomain] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

  const filteredAlumni = alumniData.filter(alumnus => {
    const matchesDomain = activeDomain === "All" || alumnus.domain === activeDomain;
    const matchesSearch = alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alumnus.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="relative min-h-screen">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-12 relative z-10">
        
        {/* Header / Hero Section (Glassmorphic) */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full shadow-lg shadow-blue-500/20 mb-4">
                <Sparkles className="text-white w-4 h-4" />
                <span className="text-white font-bold tracking-wide text-xs uppercase">Connect & Grow</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 tracking-tight mb-3">
                Alumni Network
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-xl">
                Discover and connect with our elite alumni driving innovation across the world's leading companies.
              </p>
            </div>
            
            {/* Elegant Search Bar */}
            <div className="relative w-full lg:w-96 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <input 
                type="text" 
                placeholder="Search alumni, roles, or companies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full pl-12 pr-6 py-4 bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition-all text-sm font-semibold text-slate-800 placeholder-slate-400"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
          </div>

          {/* Premium Domain Filters */}
          <div className="flex flex-wrap items-center gap-3 bg-white/50 p-2 rounded-2xl border border-white/60 inline-flex">
            <div className="flex items-center space-x-2 px-3 text-slate-400">
              <Filter size={18} />
            </div>
            {domains.map(domain => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeDomain === domain 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' 
                  : 'bg-transparent text-slate-600 hover:bg-white hover:shadow-sm'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumnus) => (
              <div key={alumnus.id} className="group relative bg-white/70 backdrop-blur-lg rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden">
                
                {/* Decorative Card Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getDomainColor(alumnus.domain).split(' ')[0]} rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center space-x-5">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getDomainColor(alumnus.domain).split(' ')[0]} rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity`} />
                        <img src={alumnus.image} alt={alumnus.name} className="relative w-16 h-16 rounded-full border-2 border-white object-cover shadow-sm" />
                      </div>
                      <div>
                        <h3 
                          onClick={() => setSelectedAlumnus(alumnus)}
                          className="text-xl font-black text-slate-900 cursor-pointer group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all decoration-blue-500/30 hover:underline underline-offset-4"
                          title="Click to view posted job openings"
                        >
                          {alumnus.name}
                        </h3>
                        <p className="text-sm font-bold text-slate-400 mt-1 flex items-center">
                          Batch of {alumnus.batch}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${getDomainColor(alumnus.domain)}`}>
                      {alumnus.domain}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    <div className="flex items-center text-slate-700 text-sm font-semibold group/item">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="truncate">{alumnus.role}</span>
                    </div>
                    <div className="flex items-center text-slate-700 text-sm font-semibold group/item">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="truncate">{alumnus.company}</span>
                    </div>
                    <div className="flex items-center text-slate-700 text-sm font-semibold group/item">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="truncate">{alumnus.location}</span>
                    </div>
                    <div className="flex items-center text-slate-700 text-sm font-semibold group/item">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <a href={`tel:${alumnus.phone}`} className="hover:text-blue-600 transition-colors">{alumnus.phone}</a>
                    </div>
                  </div>

                  {/* Elegant Action Buttons */}
                  <div className="flex items-center space-x-3 pt-6 border-t border-slate-100/60">
                    <a href={alumnus.linkedin} className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5">
                      <Linkedin className="w-4 h-4" />
                      <span>Connect Profile</span>
                    </a>
                    <a href={`mailto:${alumnus.email}`} title="Email" className="flex items-center justify-center w-12 h-12 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-100/80 mb-6 shadow-inner">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">No alumni found</h3>
              <p className="text-slate-500 font-medium">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>

        {/* Premium Openings Modal */}
        {selectedAlumnus && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
              onClick={() => setSelectedAlumnus(null)}
            />
            
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-slide-up">
              
              {/* Decorative Modal Header Gradient */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 pointer-events-none" />

              {/* Modal Header */}
              <div className="relative p-8 border-b border-slate-100 flex items-start justify-between z-10">
                <div className="flex items-center space-x-5">
                  <div className="relative">
                    <img src={selectedAlumnus.image} alt={selectedAlumnus.name} className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{selectedAlumnus.name}'s Postings</h2>
                    <p className="text-slate-500 font-bold flex items-center mt-1 bg-slate-100 px-3 py-1 rounded-lg inline-flex">
                      <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                      {selectedAlumnus.company}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAlumnus(null)}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="relative p-8 overflow-y-auto z-10 bg-slate-50/50">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  Active Opportunities ({selectedAlumnus.openings.length})
                </h3>

                {selectedAlumnus.openings.length > 0 ? (
                  <div className="space-y-5">
                    {selectedAlumnus.openings.map(job => (
                      <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group relative overflow-hidden">
                        
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                          <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${job.type === 'Internship' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                            {job.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-bold mb-6">
                          <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg">
                            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                            {job.location}
                          </div>
                          <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg">
                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                            {job.date}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                          <a 
                            href={`mailto:${selectedAlumnus.email}?subject=Referral Request: ${encodeURIComponent(job.title)} at ${encodeURIComponent(selectedAlumnus.company)}&body=Hi ${encodeURIComponent(selectedAlumnus.name)},%0D%0A%0D%0AI saw your posting for the ${encodeURIComponent(job.title)} position on our alumni portal. I am very interested in this opportunity and would love to discuss a potential referral.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`}
                            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 px-6 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Request Referral</span>
                          </a>
                          
                          <button className="w-full sm:w-auto flex items-center justify-center space-x-2 text-slate-700 font-bold text-sm bg-slate-100 hover:bg-slate-200 py-3 px-6 rounded-xl transition-all">
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-4">
                      <Briefcase className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-bold text-lg">No job openings posted at the moment.</p>
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 bg-white border-t border-slate-100 text-center relative z-10">
                <p className="text-sm text-slate-500 font-medium">Reach out to <span className="font-bold text-slate-700">{selectedAlumnus.name}</span> directly via LinkedIn or Email for general inquiries.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniContact;
