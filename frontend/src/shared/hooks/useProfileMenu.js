import { useMemo } from 'react';
import {
  HiUser,
  HiBriefcase,
  HiLightningBolt,
  HiAcademicCap,
  HiDocumentText,
} from 'react-icons/hi';

export const useProfileMenu = (profileData, resumes, PROFILE_SECTIONS) => {
  const menuItems = useMemo(() => [
    {
      id: PROFILE_SECTIONS.ABOUT,
      label: 'About Me',
      icon: HiUser,
      description: 'Personal information & bio',
      componentName: 'AboutMe',
      badge: null,
    },
    {
      id: PROFILE_SECTIONS.EXPERIENCE,
      label: 'Work Experience',
      icon: HiBriefcase,
      description: 'Career history & roles',
      componentName: 'Experience',
      badge: profileData.experience.length || null,
    },
    {
      id: PROFILE_SECTIONS.SKILLS,
      label: 'Skills & Expertise',
      icon: HiLightningBolt,
      description: 'Technical & soft skills',
      componentName: 'Skills',
      badge: profileData.skills.length || null,
    },
    {
      id: PROFILE_SECTIONS.PORTFOLIO,
      label: 'Portfolio & Projects',
      icon: HiAcademicCap,
      description: 'Showcase your work',
      componentName: 'Portfolio',
      badge: profileData.portfolio.length || null,
    },
    {
      id: PROFILE_SECTIONS.RESUME,
      label: 'Resume & Documents',
      icon: HiDocumentText,
      description: 'Upload & manage resumes',
      componentName: 'ResumeUpload',
      badge: resumes.length || null,
    },
  ], [profileData, resumes, PROFILE_SECTIONS]);

  const getActiveMenuItem = (activeSection) => {
    return menuItems.find(item => item.id === activeSection);
  };

  return {
    menuItems,
    getActiveMenuItem,
  };
};