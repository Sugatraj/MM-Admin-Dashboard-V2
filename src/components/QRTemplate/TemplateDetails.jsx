import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faImage, faPen } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

function TemplateDetails() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templateData, setTemplateData] = useState({
    name: '',
    qrPosition: 'centre',
    filename: '',
    createdOn: ''
  });

  // Fetch template details on component mount
  useEffect(() => {
    fetchTemplateDetails();
  }, [templateId]);

  const fetchTemplateDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.post(
        'https://men4u.xyz/v2/admin/view_qr_templates',
        {
          template_id: parseInt(templateId)
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update template data with fetched details
      setTemplateData({
        name: response.data.name,
        qrPosition: response.data.qr_overlay_position,
        filename: response.data.image_name,
        createdOn: response.data.created_on
      });

    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch template details');
      console.error('Error fetching template:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !templateData.name) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <button
            onClick={() => navigate(`/edit-template/${templateId}`)}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

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