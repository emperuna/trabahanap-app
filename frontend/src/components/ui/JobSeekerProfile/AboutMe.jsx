import React from 'react';

const AboutMe = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-2">
        <h2 className="text-4xl md:text-6xl font-black" style={{ color: '#153CF5' }}>About Me</h2>
        <button 
          className="text-white px-4 py-1.5 rounded-lg text-base transition-colors"
          style={{ backgroundColor: '#153CF5' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0F2ECC'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#153CF5'}
        >
          Edit Content
        </button>
      </div>
      <div className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="text-gray-700 leading-loose text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700 leading-loose text-lg">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;