import React from 'react';
import LocationIcon from '../../../assets/icons/Location.svg';

const ProfileHeader = ({ profileData }) => {
  return (
    <div className="bg-transparent px-4 md:px-8 lg:px-20 ml-12 md:ml-16">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between max-w-7xl mx-auto gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <img
            src={profileData.profileImage}
            alt="Profile"
            className="w-60 h-60 rounded-full border-8 bg-gray-200 mx-auto md:mx-0"
            style={{ 
              borderColor: '#153CF5', 
              boxShadow: '0 0 20px rgba(21, 60, 245, 0.6), 0 0 40px rgba(21, 60, 245, 0.4), 0 0 60px rgba(21, 60, 245, 0.2)',
              objectFit: 'cover',
              aspectRatio: '1'
            }}
          />
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{profileData.name}</h1>
            <div className="flex items-center justify-start mt-2">
              <img 
                src={LocationIcon} 
                alt="Location" 
                className="mr-2 w-5 h-5"
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)' }}
              />
              <span className="text-lg" style={{ color: '#153CF5' }}>{profileData.location}</span>
            </div>
            <p className="mt-6 max-w-lg text-lg" style={{ color: '#B3B3B3' }}>{profileData.aboutMe}</p>
          </div>
        </div>
        <button 
          className="text-white px-4 py-1.5 text-base rounded-lg transition-colors mt-4 md:mt-15 mx-auto md:mx-0 w-fit"
          style={{ backgroundColor: '#153CF5' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0F2ECC'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#153CF5'}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;