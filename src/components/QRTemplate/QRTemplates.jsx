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
                <button
                  onClick={() => navigate(`/edit-template/${template.qr_code_template_id}`)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
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
    </div>
  );
}

export default QRTemplates;