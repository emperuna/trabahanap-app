import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import ProfileHeader from '../components/ui/JobSeekerProfile/ProfileHeader';
import AboutMe from '../components/ui/JobSeekerProfile/AboutMe';
import Skills from '../components/ui/JobSeekerProfile/Skills';
import Portfolio from '../components/ui/JobSeekerProfile/Portfolio';
import Contact from '../components/ui/JobSeekerProfile/Contact';
import Experience from '../components/ui/JobSeekerProfile/Experience';

// Import SVG icons for stats section
import TimeIcon from '../assets/icons/Time.svg';
import VerifiedIcon from '../assets/icons/Verified.svg';
import PersonIcon from '../assets/icons/Person.svg';

const JobSeekerProfile = () => {
  const [activeTab, setActiveTab] = useState('About Me');
  const location = useLocation();
  
  // Mock data for demonstration
  const profileData = {
    name: "Marc Justin Alberto",
    location: "Gilid, Laguna",
    profileImage: "/api/placeholder/200/200",
    jobExperience: "3+ Years",
    certificates: "5 Certificates",
    trainings: "2 Trainings",
    aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    detailedAbout: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contacts: {
      mobile: "0123 456 7899",
      facebook: "www.facebook.com/MarcJustinAlberto",
      linkedin: "www.linkedin.com/in/marcjustinalberto",
      email: "marcjustin.alberto@gmail.com",
      viber: "+63 912 345 6789"
    }
  };

  const tabItems = ['About Me', 'Experience', 'Skills', 'Portfolio'];
  const isProfilePage = location.pathname === '/jobseeker-profile';

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar showProfileContainer={isProfilePage} />
      
      {/* Fixed Sidebar - Hidden on mobile, visible on md+ */}
      <SideNavbar />

      {/* Profile Header Section - Responsive */}
      <ProfileHeader profileData={profileData} />

      {/* Main Content - Responsive */}
      <div className="ml-12 md:ml-16 p-4 md:p-8">
        {/* Stats Cards - Responsive */}
        <div className="p-4 md:p-6 mb-8 -mx-4 -ml-16 md:-ml-24 md:-mr-8 w-screen" style={{ backgroundColor: '#153CF5' }}>
          <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-32">
            <div className="text-white text-left">
              <div className="flex items-center justify-start space-x-4">
                <img 
                  src={TimeIcon} 
                  alt="Time" 
                  className="w-6 h-6"
                  style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                />
                <div>
                  <div className="font-bold text-2xl">{profileData.jobExperience}</div>
                  <div className="text-base opacity-90">Job Experience</div>
                </div>
              </div>
            </div>
            <div className="text-white text-left">
              <div className="flex items-center justify-start space-x-4">
                <img 
                  src={VerifiedIcon} 
                  alt="Verified" 
                  className="w-6 h-6"
                  style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                />
                <div>
                  <div className="font-bold text-2xl">{profileData.certificates}</div>
                  <div className="text-base opacity-90">Achieved</div>
                </div>
              </div>
            </div>
            <div className="text-white text-left">
              <div className="flex items-center justify-start space-x-4">
                <img 
                  src={PersonIcon} 
                  alt="Person" 
                  className="w-6 h-6"
                  style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                />
                <div>
                  <div className="font-bold text-2xl">{profileData.trainings}</div>
                  <div className="text-base opacity-90">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Responsive */}
        <div className="p-2 mb-8 border-b-2 border-gray-200">
          <nav className="flex flex-wrap justify-between gap-4 md:gap-8">
            {tabItems.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg font-medium text-base transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                style={activeTab === tab ? { backgroundColor: '#153CF5' } : {}}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className={`grid gap-8 ${(activeTab === 'About Me' || activeTab === 'Experience' || activeTab === 'Skills') ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* Main Content */}
          <div className={(activeTab === 'About Me' || activeTab === 'Experience' || activeTab === 'Skills') ? 'lg:col-span-2' : 'col-span-1'}>
            {activeTab === 'About Me' && <AboutMe />}

            {activeTab === 'Experience' && <Experience />}

            {activeTab === 'Skills' && <Skills />}

            {activeTab === 'Portfolio' && <Portfolio />}
          </div>

          {/* Contact Sidebar - Visible on About Me, Experience, and Skills tabs */}
          {(activeTab === 'About Me' || activeTab === 'Experience' || activeTab === 'Skills') && (
            <div className="lg:col-span-1">
              <Contact profileData={profileData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
