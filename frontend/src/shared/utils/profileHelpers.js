import React from 'react';
import {
  AboutSection as AboutMe,
  ExperienceSection as Experience,
  SkillsSection as Skills,
  Portfolio,
  ResumeUpload,
} from '../../features/profile/components';

export const getProfileComponent = (componentName) => {
  const componentMap = {
    AboutMe: AboutMe,
    Experience: Experience,
    Skills: Skills,
    Portfolio: Portfolio,
    ResumeUpload: ResumeUpload,
  };

  return componentMap[componentName] || null;
};

export const getComponentProps = (componentName, profileData, resumes) => {
  const propsMap = {
    AboutMe: { profileData },
    Experience: { experiences: profileData.experience },
    Skills: { skills: profileData.skills },
    Portfolio: { items: profileData.portfolio },
    ResumeUpload: { resumes },
  };

  return propsMap[componentName] || {};
};