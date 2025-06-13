import React, { useCallback, useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Tickets() {
  const { getToken } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate();

  // Fetch outlets on component mount
  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://men4u.xyz/v2/common/listview_outlet',
        {
          user_id: 1,
          app_source: "admin_dashboard"
        },
        {
          headers: {
            Authorization: getToken(),
          }
        }
      );

      if (response.data.data) {
        setOutlets(response.data.data);
      } else {
        setError('Failed to fetch outlets');
      }
    } catch (error) {
      console.error('Failed to fetch outlets:', error);
      setError(error.response?.data?.msg || 'Failed to fetch outlets');
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    if (!selectedOutlet) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://men4u.xyz/v2/admin/ticket_list',
        {
          outlet_id: selectedOutlet
        },
        {
          headers: {
            Authorization: getToken(),
          }
        }
      );

      if (response.data.tickets) {
        setTickets(response.data.tickets);
      } else {
        setError('Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setError(error.response?.data?.msg || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  // Update the useEffect for search
  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput, tickets]); // Add tickets as dependency to handle when tickets change

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredTickets(tickets);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const filtered = tickets.filter(ticket => {
      // Only search in ticket number, title, and user name
      const ticketNumber = String(ticket.ticket_number || '').toLowerCase();
      const title = String(ticket.title || '').toLowerCase();
      const userName = String(ticket.user_name || '').toLowerCase();

      return (
        ticketNumber.includes(searchLower) ||
        title.includes(searchLower) ||
        userName.includes(searchLower)
      );
    });
    
    setFilteredTickets(filtered);
  };

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/ticket-details/${ticketId}`);  // Updated to match App.jsx route
  };

  return (
    <div className="container mx-auto flex-grow py-6 px-4">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-center flex-grow">Tickets</h1>
          </div>

          {/* Outlet Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4">
              <select
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedOutlet || ''}
                onChange={(e) => setSelectedOutlet(e.target.value)}
              >
                <option value="">Select an outlet</option>
                {outlets.map((outlet) => (
                  <option key={outlet.outlet_id} value={outlet.outlet_id}>
                    {outlet.outlet_name} ({outlet.outlet_code})
                  </option>
                ))}
              </select>
              <button
                onClick={fetchTickets}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                disabled={loading || !selectedOutlet}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Show Tickets'
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}

          {/* Only show tickets UI if outlet is selected and tickets are loaded */}
          {selectedOutlet && tickets.length > 0 && (
            <>
              {/* Search Form */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
                <input
                  type="text"
                  placeholder="Search by ticket number, title, or user..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Table Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="mr-2">Show</span>
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                  <span className="ml-2">entries</span>
                </div>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTickets.map((ticket, index) => (
                      <tr key={ticket.ticket_id || `ticket-${index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{ticket.ticket_number || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{ticket.title || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                            {ticket.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{ticket.created_on || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            {getTypeIcon(ticket.user_role)} {ticket.user_name || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => handleViewTicket(ticket.ticket_id)}
                            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  Showing {filteredTickets.length} of {tickets.length} entries
                  {searchInput && (
                    <span className="ml-2 text-gray-500">
                      (filtered from {tickets.length} total entries)
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-300 rounded-md">Previous</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-purple-600 text-white">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md">Next</button>
                </div>
              </div>
            </>
          )}

          {selectedOutlet && tickets.length === 0 && !loading && (
            <div className="text-center text-gray-500 mt-4">
              No tickets found for this outlet
            </div>
          )}

          {selectedOutlet && filteredTickets.length === 0 && !loading && (
            <div className="text-center text-gray-500 mt-4">
              {tickets.length > 0 
                ? 'No matching tickets found for your search'
                : 'No tickets found for this outlet'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const getTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'owner':
      return '👑';
    case 'waiter':
      return '👨‍🍳';
    case 'customer':
      return '👤';
    case 'outlet':
      return '🏪';
    case 'chef':
      return '🍳';
    default:
      return '❓';
  }
};

export default Tickets;