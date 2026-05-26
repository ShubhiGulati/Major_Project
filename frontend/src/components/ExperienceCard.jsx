import React from 'react';
import { Building2, Briefcase, DollarSign, Calendar, Award, Phone, Mail, Linkedin, Trash2, CheckCircle2, AlertCircle, FileText, Lightbulb } from 'lucide-react';

const ExperienceCard = ({ experience, isMyExperience = false, onDelete, currentUser }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'medium': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'hard': return 'text-rose-600 bg-rose-100 border-rose-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getCompanyTypeBorder = (type) => {
    return type === 'core' ? 'border-t-indigo-600' : 'border-t-purple-600';
  };

  return (
    <div className={`group bg-white rounded-xl border-t-[4px] ${getCompanyTypeBorder(experience.companyType)} border-x border-b border-slate-200 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col`}>
      
      {/* Header */}
      <div className="p-4 border-b border-dashed border-slate-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2.5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-inner ${experience.companyType === 'core' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight line-clamp-1">
                {experience.companyName}
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5 flex items-center line-clamp-1">
                <Briefcase className="mr-1" size={12} />
                {experience.role}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1.5 shrink-0 pl-2">
            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border shadow-sm ${experience.companyType === 'core' ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-purple-600 text-white border-purple-700'}`}>
              {experience.companyType === 'core' ? 'Core' : 'Non-Core'}
            </span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getDifficultyColor(experience.difficulty)}`}>
              {experience.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs mt-3 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-[10px] shrink-0">
              {experience.name.charAt(0)}
            </div>
            <span className="font-bold text-slate-800 truncate">{experience.name}</span>
            <span className="text-slate-400 font-bold">•</span>
            <span className="text-slate-500 font-medium truncate">{experience.department}</span>
          </div>
          <span className="text-slate-500 font-bold flex items-center bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0 ml-2">
            <Calendar size={10} className="mr-1" />
            {experience.batch}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 space-y-4">
        
        {/* Package Highlight */}
        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white p-3 rounded-lg border border-emerald-100/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
            <div>
              <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest leading-none mb-1">Offered Package</p>
              <p className="text-lg font-black text-slate-900 leading-none">{experience.package}</p>
            </div>
          </div>
          <CheckCircle2 className="text-emerald-400 w-6 h-6 opacity-40" />
        </div>

        {/* Interview Rounds */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
            <Award className="mr-1.5 text-indigo-500" size={14} /> Interview Process
          </h4>
          <p className="text-xs font-semibold text-slate-700 bg-indigo-50/40 p-3 rounded-lg border border-indigo-100/50 leading-relaxed">
            {experience.interviewRounds}
          </p>
        </div>

        {/* Technical Questions */}
        {experience.technicalQuestions && (
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
              <FileText className="mr-1.5 text-blue-500" size={14} /> Technical Questions
            </h4>
            <div className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border-l-2 border-l-blue-500 border-y border-r border-slate-100 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">
              {experience.technicalQuestions}
            </div>
          </div>
        )}

        {/* HR Questions */}
        {experience.hrQuestions && (
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
              <AlertCircle className="mr-1.5 text-purple-500" size={14} /> HR Questions
            </h4>
            <div className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border-l-2 border-l-purple-500 border-y border-r border-slate-100 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
              {experience.hrQuestions}
            </div>
          </div>
        )}

        {/* Tips */}
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
            <Lightbulb className="mr-1.5 text-amber-500" size={14} /> Tips & Advice
          </h4>
          <div className="text-xs font-bold text-slate-800 bg-amber-50/50 p-3 rounded-lg border border-amber-200/50 whitespace-pre-wrap leading-relaxed">
            {experience.tips}
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-dashed border-slate-100 bg-slate-50/50 mt-auto rounded-b-xl">
        
        {/* Contact Info */}
        {(experience.phone || experience.email || experience.linkedin) && (
          <div className="mb-3 pb-3 border-b border-slate-200">
            <div className="flex flex-wrap gap-1.5">
              {experience.phone && (
                <a href={`tel:${experience.phone}`} className="flex items-center space-x-1 px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded flex-1 justify-center hover:border-emerald-300 hover:text-emerald-600 transition-colors text-[10px] font-bold shadow-sm">
                  <Phone size={10} /> <span>Phone</span>
                </a>
              )}
              {experience.email && (
                <a href={`mailto:${experience.email}`} className="flex items-center space-x-1 px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded flex-1 justify-center hover:border-rose-300 hover:text-rose-600 transition-colors text-[10px] font-bold shadow-sm">
                  <Mail size={10} /> <span>Email</span>
                </a>
              )}
              {experience.linkedin && (
                <a href={experience.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded flex-1 justify-center hover:border-blue-300 hover:text-blue-600 transition-colors text-[10px] font-bold shadow-sm">
                  <Linkedin size={10} /> <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-[9px] font-bold text-slate-400 tracking-widest">
            {new Date(experience.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
          </div>
          
          {/* Delete Button */}
          {(isMyExperience || currentUser?.role === 'admin') && onDelete && (
            <button
              onClick={() => onDelete(experience._id)}
              className="flex items-center space-x-1 px-2 py-1 bg-rose-50 text-rose-600 rounded hover:bg-rose-100 hover:text-rose-700 transition-colors text-[10px] font-black border border-rose-100"
            >
              <Trash2 size={10} />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
