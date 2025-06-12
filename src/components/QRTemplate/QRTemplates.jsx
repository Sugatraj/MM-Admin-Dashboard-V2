import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faImage,
  faChevronDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

function QRTemplates() {
  const navigate = useNavigate();
  const templates = [
    { id: 1, name: 'Lets Go', position: 'Centre', filename: 'YYSR14107H.jpg' },
    { id: 2, name: 'Gardennn', position: 'Top', filename: 'PC8J7RAVHG.jpg' },
    { id: 3, name: 'Testing Done', position: 'Centre', filename: 'VLXPV2I8X4.jpg' },
    { id: 4, name: 'Working', position: 'Top', filename: 'SLPYJ5379H.jpg' },
    { id: 5, name: 'Hotel MK', position: 'Centre', filename: '4PTG6E249B.jpg' },
  ];

  return (
    <div className="p-6">
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
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          + Create Template
        </button>
      </div>

      {/* Stats and Search Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-2xl font-semibold">5</div>
          <div className="text-xs text-gray-500 uppercase">TOTAL</div>
        </div>
        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <select className="w-40 appearance-none h-10 pl-3 pr-10 text-gray-600 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex flex-col items-center justify-center bg-gray-50">
              <FontAwesomeIcon 
                icon={faImage} 
                className="w-10 h-10 text-gray-300 mb-2"
              />
              <div className="text-sm text-gray-400">Image not available</div>
              <div className="text-xs text-gray-400 mt-1">{template.filename}</div>
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">QR Position:</span>
                <span className="text-xs text-gray-900 ml-1">{template.position}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRTemplates;