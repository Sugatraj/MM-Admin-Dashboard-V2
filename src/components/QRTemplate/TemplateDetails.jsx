import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faImage, faPen } from '@fortawesome/free-solid-svg-icons';

function TemplateDetails() {
  const navigate = useNavigate();
  
  // Mock data - replace with actual data fetching
  const templateData = {
    name: 'lets go',
    qrPosition: 'Centre',
    filename: 'YY5RT4107H.jpg',
    createdOn: '02 May 2025'
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
        <span className="text-gray-500">/</span>
        <Link to="/qr-templates" className="text-gray-500 hover:text-gray-700">Qr-templates</Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-700">View</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-1" />
            Back
          </button>
          <h1 className="text-xl font-semibold">Template Details</h1>
        </div>
        <button
          onClick={() => navigate(`/qr-templates/edit/${templateData.id}`)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faImage} className="w-16 h-16 text-gray-300 mb-2" />
              <div className="text-sm text-gray-400">Image not available</div>
              <div className="text-xs text-gray-400 mt-1">{templateData.filename}</div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Name</h3>
                <p className="text-sm text-gray-900">{templateData.name}</p>
              </div>

              {/* QR Code Position */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">QR Code Position</h3>
                <p className="text-sm text-gray-900">{templateData.qrPosition}</p>
              </div>

              {/* Image Filename */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Image Filename</h3>
                <p className="text-sm text-gray-900">{templateData.filename}</p>
              </div>

              {/* Created On */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Created On</h3>
                <p className="text-sm text-gray-900">{templateData.createdOn}</p>
              </div>

              {/* QR Position Preview */}
              <div>
                <h3 className="text-sm text-gray-500 mb-2">QR Position Preview</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetails;