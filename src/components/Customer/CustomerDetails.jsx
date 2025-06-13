import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const customerData = location.state?.customerData;

  if (!customerData) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="hover:text-gray-700"
          >
            Back
          </button>
          <span>/</span>
          <span>Customer Details</span>
        </div>
        <div className="text-center py-8 text-red-500">
          No customer data available. Please go back and try again.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <button 
          onClick={() => navigate(-1)}
          className="hover:text-gray-700"
        >
          Back
        </button>
        <span>/</span>
        <span>Customer Details</span>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Name</label>
            <p className="font-medium">{customerData.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Mobile</label>
            <p className="font-medium">{customerData.mobile || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">User ID</label>
            <p className="font-medium">{customerData.user_id || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Order Count</label>
            <p className="font-medium">{customerData.order_count || '0'}</p>
          </div>
          {/* Add any other customer fields that are available in the data */}
        </div>

        {/* Order History Section (if available) */}
        {customerData.order_count > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Order History</h3>
            <div className="text-sm text-gray-500">
              This customer has placed {customerData.order_count} orders.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDetails;