import React from 'react';
import DocumentEditIcon from '../../../assets/icons/DocumentEdit.svg';
import TrashIcon from '../../../assets/icons/Trash.svg';
import TimeIcon from '../../../assets/icons/Time.svg';

const Experience = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-2">
        <h2 className="text-4xl md:text-6xl font-black" style={{ color: '#153CF5' }}>Experience</h2>
        <button 
          className="text-white px-4 py-1.5 rounded-lg text-base transition-colors"
          style={{ backgroundColor: '#153CF5' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0F2ECC'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#153CF5'}
        >
          Add Experience
        </button>
      </div>
      <div className="space-y-6">
        {/* Experience Card 1 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Jr Software Engineer</h3>
              <p className="text-base font-medium mb-2" style={{ color: '#153CF5' }}>Meta</p>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <img src={TimeIcon} alt="Time" className="mr-2 w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(61%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' }} />
                Jan 2022 - Sep 2025
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-blue-50 rounded transition-colors">
                <img src={TrashIcon} alt="Delete" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)' }} />
              </button>
              <button className="p-2 hover:bg-blue-50 rounded transition-colors" style={{ color: '#153CF5' }}>
                <img src={DocumentEditIcon} alt="Edit" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)' }} />
              </button>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>

        {/* Experience Card 2 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">UI/UX Designer</h3>
              <p className="text-base font-medium mb-2" style={{ color: '#153CF5' }}>Tesla</p>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <img src={TimeIcon} alt="Time" className="mr-2 w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(61%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' }} />
                Mar 2020 - Dec 2021
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-blue-50 rounded transition-colors">
                <img src={TrashIcon} alt="Delete" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)' }} />
              </button>
              <button className="p-2 hover:bg-blue-50 rounded transition-colors" style={{ color: '#153CF5' }}>
                <img src={DocumentEditIcon} alt="Edit" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)' }} />
              </button>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>Design intuitive user interfaces and user experiences for automotive technology platforms. Conduct user research and create wireframes, prototypes, and design systems. Work closely with engineering teams to ensure design implementation meets standards.</p>
            <p>Lead design workshops and collaborate with product managers to define user requirements. Create comprehensive design documentation and maintain design consistency across all platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;