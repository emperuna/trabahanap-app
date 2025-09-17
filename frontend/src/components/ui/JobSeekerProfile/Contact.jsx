import React from 'react';
import { Link } from 'react-router-dom';
import PenIcon from '../../../assets/icons/pen.svg';

const Contact = ({ profileData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 relative overflow-hidden">
      {/* Embedded grey div that fits top corners */}
      <div className="absolute top-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold" style={{ color: '#153CF5' }}>Contact</h3>
          <button 
            className="p-2"
            style={{ color: '#153CF5' }}
          >
            <img src={PenIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(6500%) hue-rotate(230deg) brightness(95%) contrast(105%)' }} />
          </button>
        </div>
      </div>

      {/* Content with top margin to account for embedded div */}
      <div className="mt-14">
        <div className="space-y-2">
        <div className="py-4 border-b border-gray-200">
          <div className="font-medium text-gray-900 text-base mb-1">Mobile</div>
          <div className="text-sm text-gray-500">{profileData.contacts.mobile}</div>
        </div>

        <div className="py-2 border-b border-gray-200">
          <div className="font-medium text-gray-900 text-base mb-1">Facebook</div>
          <div className="text-sm text-gray-500">{profileData.contacts.facebook}</div>
        </div>

        <div className="py-2 border-b border-gray-200">
          <div className="font-medium text-gray-900 text-base mb-1">LinkedIn</div>
          <div className="text-sm text-gray-500">{profileData.contacts.linkedin}</div>
        </div>

        <div className="py-2 border-b border-gray-200">
          <div className="font-medium text-gray-900 text-base mb-1">Email</div>
          <div className="text-sm text-gray-500">{profileData.contacts.email}</div>
        </div>

        <div className="py-2 border-b border-gray-200">
          <div className="font-medium text-gray-900 text-base mb-1">Viber</div>
          <div className="text-sm text-gray-500">{profileData.contacts.viber}</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Contact;