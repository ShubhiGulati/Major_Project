import React, { useState, useEffect } from 'react';
import { Home, MessageSquare, LogOut, Menu, X, Loader, Users, BookOpen, Zap, GraduationCap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ShareExperienceModal from '../components/ShareExperienceModal';
import ExperienceCard from '../components/ExperienceCard';
import toast from 'react-hot-toast';
import { experienceAPI } from '../services/api';
import DSAMPMentorship from './DSAMPMentorship';
import StudyMaterial from '../components/StudyMaterial';
import HomePage from './HomePage';
import SeedClub from './SeedClub';
import AlumniContact from './AlumniContact';


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [myExperiences, setMyExperiences] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch experiences when experiences tab is active
  useEffect(() => {
    if (activeTab === 'experiences') {
      fetchExperiences();
    }
  }, [activeTab]);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const [myData, allData] = await Promise.all([
        experienceAPI.getMy(),
        experienceAPI.getAll()
      ]);
      setMyExperiences(myData.experiences || []);
      setAllExperiences(allData.experiences || []);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleShareExperience = async (experienceData) => {
    try {
      await experienceAPI.create(experienceData);
      toast.success('Experience shared successfully! 🎉');
      setShowShareModal(false);
      // Refresh experiences list
      fetchExperiences();
    } catch (err) {
      console.error('Error sharing experience:', err);
      toast.error(err.response?.data?.message || 'Failed to share experience. Please try again.');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) {
      return;
    }
    
    try {
      await experienceAPI.delete(id);
      toast.success('Experience deleted successfully');
      // Refresh experiences list
      fetchExperiences();
    } catch (err) {
      console.error('Error deleting experience:', err);
      toast.error(err.response?.data?.message || 'Failed to delete experience');
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'seed-club', label: 'SEED Club', icon: Zap },
    { id: 'experiences', label: 'Shared Experiences', icon: MessageSquare },
    { id: 'dsamp', label: 'DSAMP Mentorship', icon: Users },
    { id: 'study-material', label: 'Study Material', icon: BookOpen },
    { id: 'alumni', label: 'Alumni Network', icon: GraduationCap },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <img
              src="https://departments.nitj.ac.in/static/media/logo.f2c76d0937070ba81dc0.png"
              alt="NITJ Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-blue-600">E-SPARK</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800 ml-12 lg:ml-0">
              {menuItems.find((item) => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              👋 Hi, <span className="font-semibold text-gray-900">{user?.name}</span>
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className={`flex-1 overflow-y-auto ${activeTab === 'dsamp' ? 'p-0 bg-slate-950' : 'p-6 bg-gray-50'}`}>
          {activeTab === 'dsamp' && (
            <DSAMPMentorship />
          )}
          {activeTab === 'study-material' && (
            <StudyMaterial />
          )}
          {activeTab === 'home' && (
            <HomePage />
          )}
          {activeTab === 'seed-club' && (
            <SeedClub />
          )}
          {activeTab === 'alumni' && (
            <AlumniContact />
          )}

          {activeTab === 'experiences' && (
            <div className="max-w-7xl mx-auto">
              {/* Share Experience Button - Fixed at top */}
              <div className="mb-6">
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-semibold"
                >
                  + Share Your Experience
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader className="animate-spin text-blue-600" size={48} />
                </div>
              ) : (
                <div className="space-y-8">
                  {/* My Experiences Section */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">My Experiences ({myExperiences.length})</span>
                    </h2>
                    {myExperiences.length === 0 ? (
                      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        You haven't shared any experiences yet. Click the button above to share your interview experience!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {myExperiences.map((exp) => (
                          <ExperienceCard 
                            key={exp._id} 
                            experience={exp} 
                            isMyExperience={true}
                            onDelete={handleDeleteExperience}
                            currentUser={user}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* All Experiences Section */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">All Shared Experiences ({allExperiences.length})</span>
                    </h2>
                    {allExperiences.length === 0 ? (
                      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        No experiences have been shared yet. Be the first to share!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {allExperiences.map((exp) => (
                          <ExperienceCard 
                            key={exp._id} 
                            experience={exp} 
                            isMyExperience={false}
                            onDelete={handleDeleteExperience}
                            currentUser={user}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Share Experience Modal */}
      {showShareModal && (
        <ShareExperienceModal
          onClose={() => setShowShareModal(false)}
          onSubmit={handleShareExperience}
        />
      )}
    </div>
  );
};

export default UserDashboard;
