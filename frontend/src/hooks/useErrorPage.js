import { useNavigate, useLocation } from 'react-router-dom';

export const useErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getFeatureName = () => {
    const path = location.pathname;
    const featureMap = {
      '/jobs': 'Job Search',
      '/post-job': 'Post a Job',
      '/career-advice': 'Career Advice',
      '/resume-builder': 'Resume Builder',
      '/salary-guide': 'Salary Guide',
      '/interview-tips': 'Interview Tips',
      '/employer-dashboard': 'Employer Dashboard',
      '/pricing': 'Pricing Plans',
      '/solutions': 'Recruitment Solutions',
      '/hire': 'Hire Talent',
      '/about': 'About Us',
      '/mission': 'Our Mission',
      '/careers': 'Careers',
      '/press': 'Press & Media',
      '/contact': 'Contact Us',
      '/help': 'Help Center',
      '/faq': 'FAQs',
      '/privacy': 'Privacy Policy',
      '/terms': 'Terms of Service',
      '/cookies': 'Cookie Policy',
    };
    return featureMap[path] || 'This Feature';
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return {
    getFeatureName,
    handleGoBack,
    handleGoHome,
    handleRefresh,
  };
};