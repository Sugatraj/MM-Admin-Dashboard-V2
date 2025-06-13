import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import {
  faChevronLeft,
  faImage,
  faChevronDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

function QRTemplates() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.get(
        'https://men4u.xyz/v2/admin/get_qr_templates',
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      setTemplates(response.data);
    } catch (err) {
      setError('Failed to fetch templates');
      console.error('Error fetching templates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      await axios.delete(
        `https://men4u.xyz/v2/admin/delete_qr_templates/${templateToDelete.qr_code_template_id}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      fetchTemplates();
      setShowDeleteModal(false);
      setTemplateToDelete(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete template');
      console.error('Error deleting template:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter templates based on search and position
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter ? template.qr_overlay_position === positionFilter : true;
    return matchesSearch && matchesPosition;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-700">Qr-templates</span>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-1" />
            Back
          </button>
          <h1 className="text-xl font-semibold">QR Templates</h1>
        </div>
        <button
          onClick={() => navigate('/create-template')}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-success-500 hover:bg-success-600 rounded-lg transition-colors duration-200"
        >
          + Create Template
        </button>
      </div>

      {/* Stats and Search Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-2xl font-semibold">{templates.length}</div>
          <div className="text-xs text-gray-500 uppercase">TOTAL</div>
        </div>
        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <select 
              className="w-40 appearance-none h-10 pl-3 pr-10 text-gray-600 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="top">Top</option>
              <option value="centre">Centre</option>
            </select>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4"
            />
          </div>
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 h-10 pl-10 pr-4 text-gray-600 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            />
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-4">
        {filteredTemplates.map((template) => (
          <div key={template.qr_code_template_id} className="bg-white rounded-lg shadow-sm">
            <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gray-50">
              <FontAwesomeIcon 
                icon={faImage} 
                className="w-12 h-12 text-gray-300 mb-3"
              />
              <div className="text-sm text-gray-400">Image not available</div>
              <div className="text-xs text-gray-400 mt-2">{template.image_name}</div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">{template.name}</h3>
                <div className="flex items-center gap-2">
                  {/* View Button */}
                  <button
                    onClick={() => navigate(`/template-details/${template.qr_code_template_id}`)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="View Details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/edit-template/${template.qr_code_template_id}`)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit Template"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      setTemplateToDelete(template);
                      setShowDeleteModal(true);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Template"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs">
                  <span className="text-gray-500">QR Position:</span>
                  <span className="text-gray-900 ml-1 capitalize">{template.qr_overlay_position}</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="text-gray-500">Created on:</span>
                  <span className="text-gray-900 ml-1">{template.created_on}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Template</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete the template "{templateToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTemplateToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-error-500 hover:bg-error-600 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  'Delete Template'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRTemplates;