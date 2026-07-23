import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaSearch, FaBriefcase, FaArrowLeft, FaCheckCircle, FaLightbulb, FaUserTie, FaBuilding, FaListUl } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Resources = () => {
  const { darkMode } = useTheme();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('cv');

  // Parse query parameter to set active tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['cv', 'jobs', 'interview'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const tabs = [
    { id: 'cv', label: 'CV Writing Tips', icon: <FaFileAlt />, emoji: '📝' },
    { id: 'jobs', label: 'Job Search Strategies', icon: <FaSearch />, emoji: '🔍' },
    { id: 'interview', label: 'Interview Preparation', icon: <FaBriefcase />, emoji: '💼' },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 via-white to-indigo-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb & Back button */}
        <div className="mb-8">
          <Link 
            to="/cv-jobs" 
            className={`inline-flex items-center text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-700'} transition-colors`}
          >
            <FaArrowLeft className="mr-2" /> Back to CV & Jobs Portal
          </Link>
        </div>

        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className={`inline-block px-4 py-2 ${darkMode ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} rounded-full text-sm font-medium mb-4`}>
            Employability Hub
          </span>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent'}`}>
            Employability Resources
          </h1>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Equip yourself with the tools, strategies, and techniques to accelerate your career journey in the UK and beyond.
          </p>
        </motion.div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 transform active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/30'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <span className="mr-3 text-lg">{tab.icon}</span>
              {tab.label}
              <span className="ml-2 text-sm opacity-90">{tab.emoji}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'cv' && (
              <motion.div
                key="cv"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl shadow-xl p-8 md:p-12 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
              >
                <div className="flex items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className={`p-4 rounded-2xl mr-4 text-3xl ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-indigo-100 text-indigo-600'}`}>
                    <FaFileAlt />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">CV Writing Tips</h2>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Build a resume that stands out to recruiters</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FaListUl className="text-indigo-500 mr-3" /> Core CV Sections
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">1. Header & Contact Details</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Include your full name, phone number, email, location (City/Country), and LinkedIn profile link.</p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">2. Professional Profile</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>A brief 3-4 sentence paragraph highlighting who you are, your key strengths, and what you aim to achieve.</p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">3. Work History & Projects</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>List in reverse chronological order. Focus on results and accomplishments rather than just day-to-day duties.</p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">4. Education & Qualifications</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Include university names, degrees obtained, graduation dates, and relevant academic highlights.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FaLightbulb className="text-indigo-500 mr-3" /> Best Practices for Success
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Tailor to the Job Description</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Carefully read the job posting and include the key industry words and skills referenced within your experience bullets.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Keep it Concise</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Limit your CV to exactly 2 pages. Use clear fonts like Inter, Calibri, or Arial (size 10-12pt) with consistent margins.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Quantify Achievements</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Use concrete metrics wherever possible (e.g., "Increased student intake by 25%", "Managed project budget of £10k").</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className={`p-6 rounded-2xl bg-gradient-to-r ${darkMode ? 'from-blue-900/30 to-indigo-900/30' : 'from-indigo-50 to-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-indigo-100'}`}>
                    <h4 className="font-bold text-lg mb-2">Need a CV Review?</h4>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Submit your CV through our portal to receive professional recommendations and formatting assistance from our experts.</p>
                    <Link to="/cv-jobs#cv-form" className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-0.5">
                      Upload Your CV
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl shadow-xl p-8 md:p-12 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
              >
                <div className="flex items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className={`p-4 rounded-2xl mr-4 text-3xl ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-indigo-100 text-indigo-600'}`}>
                    <FaSearch />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Job Search Strategies</h2>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Master the channels of finding job opportunities</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FaBuilding className="text-indigo-500 mr-3" /> Job Hunting Channels
                    </h3>
                    <div className="space-y-4">
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">Professional Networking (LinkedIn)</h4>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Optimize your profile to "All-Star" status. Share updates, connect with alumni from your university, and engage directly with recruiters in your target industry.</p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">UK & International Job Boards</h4>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Leverage popular sites like LinkedIn Jobs, Indeed, Reed, Totaljobs, and CV-Library. Set up automated search alerts for specific keywords.</p>
                      </div>
                      <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="font-bold mb-2">Direct Company Pages</h4>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>List 20-30 target employers and check their careers portal weekly. Many organizations publish opportunities exclusively on their site.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FaLightbulb className="text-indigo-500 mr-3" /> Structured Application Workflow
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Keep a Tracking Sheet</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Record company name, position, salary, date applied, status, and contact person. This prevents confusion when you receive unexpected screening calls.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Follow Up</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>If you haven't heard back within 10-14 days after submitting, send a polite follow-up email to the recruiter confirming your enthusiasm.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'interview' && (
              <motion.div
                key="interview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl shadow-xl p-8 md:p-12 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
              >
                <div className="flex items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className={`p-4 rounded-2xl mr-4 text-3xl ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-indigo-100 text-indigo-600'}`}>
                    <FaBriefcase />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Interview Preparation</h2>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Build confidence and refine your interview presence</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FaUserTie className="text-indigo-500 mr-3" /> The STAR Answering Method
                    </h3>
                    <p className={`mb-6 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Structure your answers to situational and behavioral questions using this clear formula:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-indigo-50/40 border-indigo-100'}`}>
                        <span className="font-extrabold text-2xl text-indigo-500 block mb-1">S</span>
                        <strong className="block text-sm mb-1">Situation</strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Describe the context or problem you faced.</span>
                      </div>
                      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-indigo-50/40 border-indigo-100'}`}>
                        <span className="font-extrabold text-2xl text-indigo-500 block mb-1">T</span>
                        <strong className="block text-sm mb-1">Task</strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Explain your role or responsibility in the issue.</span>
                      </div>
                      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-indigo-50/40 border-indigo-100'}`}>
                        <span className="font-extrabold text-2xl text-indigo-500 block mb-1">A</span>
                        <strong className="block text-sm mb-1">Action</strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Describe specific steps you took to address it.</span>
                      </div>
                      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-indigo-50/40 border-indigo-100'}`}>
                        <span className="font-extrabold text-2xl text-indigo-500 block mb-1">R</span>
                        <strong className="block text-sm mb-1">Result</strong>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Highlight the positive outcomes or lessons learned.</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FaLightbulb className="text-indigo-500 mr-3" /> Key Prep Steps
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Research the Employer</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Analyze the company website, recent press releases, and key leadership profiles. Understand their target client base and core services.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Prepare Questions for Them</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Ask about team structure, typical day-to-day tasks, or future strategic targets. Never say "No, I don't have questions."</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <strong className="block">Test Your Setup (Virtual Interviews)</strong>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Double-check microphone volume, internet connection speed, camera alignment, and quiet environment before starting.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Resources;
