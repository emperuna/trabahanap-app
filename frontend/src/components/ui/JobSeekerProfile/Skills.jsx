import React from 'react';
import DocumentEditIcon from '../../../assets/icons/DocumentEdit.svg';
import TrashIcon from '../../../assets/icons/Trash.svg';

const Skills = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-2">
        <h2 className="text-4xl md:text-6xl font-black" style={{ color: '#153CF5' }}>Skills</h2>
        <button 
          className="text-white px-4 py-1.5 rounded-lg text-base transition-colors"
          style={{ backgroundColor: '#153CF5' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0F2ECC'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#153CF5'}
        >
          Add Skills
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Skill Card 1 - Photo Editing */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Photo Editing</h3>
              <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>Photoshop</p>
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
          <div className="text-gray-700 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>

        {/* Skill Card 2 - Layout Design */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Layout Design</h3>
              <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>Photoshop, Illustrator, Canva</p>
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
          <div className="text-gray-700 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>

        {/* Skill Card 3 - Web Development */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Web Development</h3>
              <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>React.js</p>
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
          <div className="text-gray-700 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;