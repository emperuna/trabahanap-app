import React from 'react';

// Import SVG icons
import HomeIcon from '../assets/icons/Home.svg';
import PeopleIcon from '../assets/icons/People.svg';
import PersonIcon from '../assets/icons/Person.svg';
import ChatIcon from '../assets/icons/Chat.svg';
import DocumentIcon from '../assets/icons/Document.svg';
import BellIcon from '../assets/icons/Bell.svg';
import SettingsIcon from '../assets/icons/Settings.svg';

const SideNavbar = () => {
  const sidebarItems = [
    { icon: 'Home', label: 'Home', active: false },
    { icon: 'Person', label: 'Profile', active: true },
    { icon: 'People', label: 'Network', active: false },
    { icon: 'Chat', label: 'Messages', active: false },
    { icon: 'Document', label: 'Resume', active: false },
    { icon: 'Settings', label: 'Settings', active: false }
  ];

  // Helper function to convert hex color to CSS filter
  const getColorFilter = (hexColor) => {
    if (hexColor === '#153CF5') {
      // Blue color filter for #153CF5
      return 'invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)';
    } else if (hexColor === '#b3b3b3') {
      // Gray color filter for #b3b3b3
      return 'invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)';
    }
    return '';
  };

  const renderIcon = (iconType, iconColor) => {
    switch (iconType) {
      case 'Home':
        return <img src={HomeIcon} alt="Home" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      case 'Person':
        return <img src={PersonIcon} alt="Person" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      case 'People':
        return <img src={PeopleIcon} alt="People" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      case 'Chat':
        return <img src={ChatIcon} alt="Chat" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      case 'Document':
        return <img src={DocumentIcon} alt="Document" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      case 'Bell':
        return <img src={BellIcon} alt="Bell" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      case 'Settings':
        return <img src={SettingsIcon} alt="Settings" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
      default:
        return <img src={HomeIcon} alt="Home" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(iconColor)}` }} />;
    }
  };

  return (
    <div className="fixed left-0 top-16 w-12 md:w-16 bg-white bg-opacity-50 h-full z-40 shadow-2xl">
      <nav className="mt-4 md:mt-8 flex flex-col items-center">
        {sidebarItems.map((item, index) => {
          const iconColor = item.active ? '#153CF5' : '#b3b3b3';

          return (
            <div
              key={index}
              className={`py-3 md:py-6 w-12 md:w-16 flex items-center justify-center cursor-pointer transition-colors ${
                item.active ? 'bg-blue-50/80 border-r-2' : 'hover:bg-gray-50/50'
              }`}
              style={item.active ? { borderColor: '#153CF5' } : {}}
            >
              {renderIcon(item.icon, iconColor)}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNavbar;