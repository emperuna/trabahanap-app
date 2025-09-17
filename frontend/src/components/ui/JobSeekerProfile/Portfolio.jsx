import React from 'react';
import DocumentEditIcon from '../../../assets/icons/DocumentEdit.svg';
import TrashIcon from '../../../assets/icons/Trash.svg';

const Portfolio = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-2">
        <h2 className="text-4xl md:text-6xl font-black" style={{ color: '#153CF5' }}>Portfolio</h2>
        <button 
          className="text-white px-4 py-1.5 rounded-lg text-base transition-colors"
          style={{ backgroundColor: '#153CF5' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0F2ECC'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#153CF5'}
        >
          Add Project
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio Card 1 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-white text-2xl font-bold mb-2">E-Commerce</div>
                <div className="w-16 h-12 bg-white/30 rounded mx-auto mb-3"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Ecommerce Website</h3>
                <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>Project</p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>

        {/* Portfolio Card 2 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-white text-2xl font-bold mb-2">E-Commerce</div>
                <div className="w-16 h-12 bg-white/30 rounded mx-auto mb-3"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Ecommerce Website</h3>
                <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>Project</p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>

        {/* Portfolio Card 3 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-white text-2xl font-bold mb-2">E-Commerce</div>
                <div className="w-16 h-12 bg-white/30 rounded mx-auto mb-3"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Basic Programming</h3>
                <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>Certificate</p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>

        {/* Portfolio Card 4 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-white text-2xl font-bold mb-2">E-Commerce</div>
                <div className="w-16 h-12 bg-white/30 rounded mx-auto mb-3"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Basic Programming</h3>
                <p className="text-base font-medium mb-4" style={{ color: '#153CF5' }}>Certificate</p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;