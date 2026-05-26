import React from 'react';
import { Instagram, Linkedin, Globe, Code, Zap, ArrowUpRight } from 'lucide-react';

const SeedClub = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-12">
      
      {/* Premium Hero Section */}
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="relative p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Logo Showcase */}
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 shrink-0 flex items-center justify-center p-6 bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-50 group hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-50" />
            <img 
              src="https://tse3.mm.bing.net/th/id/OIP.x8EDvTG6B2X5oRLPNIHE3QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
              alt="SEED Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-xl"
            />
          </div>
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
              <Zap className="text-blue-600 w-4 h-4" />
              <span className="text-blue-700 font-bold tracking-wide text-xs uppercase">Official Department Society</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">
              SEED <span className="text-blue-600">NITJ</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-600 mb-8">
              Society of Electrical Engineers and Developers
            </h2>
            
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-lg lg:pr-10">
              <p>
                SEED is a premier professional society bringing together innovators and visionaries in the field of electrical engineering. We are dedicated to promoting the exchange of technical knowledge, fostering professional development, and building a powerful network.
              </p>
              <p>
                Our mission is to impact the industry and empower our members through cutting-edge resources, technical publications, conferences, and immersive educational workshops. Join us to advance your knowledge and become part of a thriving engineering community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Social Media & Links (Left Column) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
              Connect With Us
            </h3>
            
            <div className="space-y-4">
              <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-white border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Instagram</h4>
                    <p className="text-sm text-pink-600 font-medium">@seed_nitj</p>
                  </div>
                </div>
                <ArrowUpRight className="text-pink-400 group-hover:text-pink-600 transition-colors" />
              </a>
              
              <a href="#" className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">LinkedIn</h4>
                    <p className="text-sm text-blue-600 font-medium">SEED NIT Jalandhar</p>
                  </div>
                </div>
                <ArrowUpRight className="text-blue-400 group-hover:text-blue-600 transition-colors" />
              </a>

              <a href="https://www.nitj.ac.in/admin/seed.html" target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Website</h4>
                    <p className="text-sm text-slate-600 font-medium">Official Page</p>
                  </div>
                </div>
                <ArrowUpRight className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Gallery (Right Column) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900">Gallery & Activities</h3>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">Glimpses of SEED</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
            {/* Main large image */}
            <div className="md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden group shadow-sm border border-slate-100 bg-slate-100 flex items-center justify-center">
              <img src="https://tse1.mm.bing.net/th/id/OIP.93IqfErK31B1x3ndeGMKqAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="SEED Team" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-2" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-black text-xl mb-1 drop-shadow-md">The SEED Team</h4>
                <p className="text-blue-200 text-sm font-medium drop-shadow-md">Core members & visionaries</p>
              </div>
            </div>
            
            {/* Top right image */}
            <div className="relative rounded-2xl overflow-hidden group shadow-sm h-48 md:h-auto border border-slate-100">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hackathon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-black text-lg mb-1">Hackathons</h4>
                <p className="text-slate-300 text-sm font-medium">24-hour coding sprints</p>
              </div>
            </div>
            
            {/* Bottom right image */}
            <div className="relative rounded-2xl overflow-hidden group shadow-sm h-48 md:h-auto border border-slate-100">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Networking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-black text-lg mb-1">Community Events</h4>
                <p className="text-slate-300 text-sm font-medium">Networking and growth</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SeedClub;
