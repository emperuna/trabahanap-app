import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const PROFILE_SECTIONS = {
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PORTFOLIO: 'portfolio',
  RESUME: 'resume',
};

export const useProfileState = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // State
  const [activeSection, setActiveSection] = useState(PROFILE_SECTIONS.ABOUT);
  const [resumes, setResumes] = useState([]);

  // Memoized profile data
  const profileData = useMemo(() => ({
    firstName: user?.firstName || 'Marc',
    lastName: user?.lastName || 'Alberto',
    email: user?.email || 'marc@example.com',
    phoneNumber: user?.phoneNumber || '+63 912 345 6789',
    location: user?.location || 'Makati, Philippines',
    bio: user?.bio || 'Full-stack developer with 5+ years of experience building modern web applications.',
    title: user?.title || 'Senior Full Stack Developer',
    company: user?.company || 'Tech Innovations Inc.',
    skills: user?.skills || ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
    experience: user?.experience || [],
    portfolio: user?.portfolio || [],
    socialLinks: {
      linkedin: user?.socialLinks?.linkedin || 'linkedin.com/in/marcalberto',
      github: user?.socialLinks?.github || 'github.com/marcalberto',
    },
  }), [user]);

  // Handle URL state for active section
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  return {
    activeSection,
    setActiveSection,
    resumes,
    setResumes,
    profileData,
    PROFILE_SECTIONS,
  };
};