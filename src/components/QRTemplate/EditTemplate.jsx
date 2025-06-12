import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faImage } from '@fortawesome/free-solid-svg-icons';

function EditTemplate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    templateName: '',
    qrPosition: 'center',
    templateImage: null
  });

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
        <span className="text-gray-500">/</span>
        <Link to="/qr-templates" className="text-gray-500 hover:text-gray-700">Qr-templates</Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-700">Edit</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-1" />
            Back
          </button>
          <h1 className="text-xl font-semibold">Edit Template</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Classic, Modern, Elegant"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QR Code Position <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                    formData.qrPosition === 'center' ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, qrPosition: 'center'})}
                >
                  <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">Center</span>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                    formData.qrPosition === 'top' ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, qrPosition: 'top'})}
                >
                  <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">Top</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={faImage} className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-1">Drag and drop your image here</p>
                <p className="text-xs text-gray-500 mb-4">or click to browse files</p>
                <p className="text-xs text-gray-400">PNG, JPG, JPEG (max 5MB)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-8">
          <button 
            onClick={() => navigate('/qr-templates')}
            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTemplate;