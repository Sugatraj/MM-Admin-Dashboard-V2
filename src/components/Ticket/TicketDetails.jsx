import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../hooks/useAdmin';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function TicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { getToken, authData } = useAuth();
  const { adminData } = useAdmin();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState(null);

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://men4u.xyz/v2/admin/ticket_view',
        { ticket_id: ticketId },
        {
          headers: {
            Authorization: getToken(),
          }
        }
      );

      if (response.data.ticket) {
        setTicket(response.data.ticket);
        setConversations(response.data.chat || []);
      } else {
        setError('Failed to fetch ticket details');
      }
    } catch (error) {
      console.error('Failed to fetch ticket details:', error);
      setError(error.response?.data?.msg || 'Failed to fetch ticket details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/tickets');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      // Add your message sending API call here
      // After successful send, refresh the ticket details
      await fetchTicketDetails();
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- Status Change Logic ---
  const handleChangeStatus = async () => {
    setStatusLoading(true);
    setStatusError(null);
    try {
      await axios.patch(
        'https://men4u.xyz/v2/admin/update_ticket_status',
        {
          ticket_id: ticketId,
          user_id: adminData?.user_id,
          ticket_status: 'resolved'
        },
        {
          headers: {
            Authorization: getToken(),
          }
        }
      );
      setShowModal(false);
      await fetchTicketDetails();
    } catch (error) {
      setStatusError(error.response?.data?.msg || 'Failed to update status');
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading && !ticket) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!ticket) {
    return <div className="text-center">Ticket not found</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/tickets" className="hover:text-gray-900">Tickets</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">View</span>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
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
              <h1 className="text-xl font-semibold">Ticket Details</h1>
            </div>
            {ticket.status === 'resolved' && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success-50 text-success-700 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Resolved</span>
              </div>
            )}
          </div>

          {/* Action buttons - only show when status is open */}
          {ticket.status === 'open' && (
            <div className="flex gap-2">
              <button
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                onClick={() => handleChangeStatus('resolved')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update Status
              </button>
            </div>
          )}

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Title</label>
                <div className="text-lg font-medium">{ticket.title}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Status</label>
                <div className="text-lg font-medium capitalize">{ticket.status}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Description</label>
                <div className="text-lg">{ticket.description}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Attachment 1</label>
                <div className="text-lg">
                  {ticket.attachment_1 ? (
                    <a href={ticket.attachment_1} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Attachment
                    </a>
                  ) : '-'}
                </div>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Ticket Number</label>
                <div className="text-lg font-medium">{ticket.ticket_number}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Attachment 2</label>
                <div className="text-lg">
                  {ticket.attachment_2 ? (
                    <a href={ticket.attachment_2} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Attachment
                    </a>
                  ) : '-'}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Created On</label>
                <div className="text-lg">{ticket.created_on}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-500">Created By</label>
                <div className="text-lg">{`${ticket.user_name} (${ticket.user_role})`}</div>
              </div>
            </div>
          </div>

          {/* Conversation Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Conversation</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 h-96 overflow-y-auto">
              {conversations.map((conv) => (
                <div key={conv.ticket_chat_id} className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>{`${conv.user_name} (${conv.user_role})`}</span>
                    <span>{conv.created_on}</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    {conv.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={ticket.status === 'closed'}
              />
              <button
                type="submit"
                disabled={loading || !message.trim() || ticket.status === 'closed'}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
                Send
              </button>
            </form>
          </div>

          {/* Confirm Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
                <p>Are you sure you want to mark this ticket as <span className="font-semibold text-green-600">resolved</span>?</p>
                {statusError && (
                  <div className="text-red-500 mt-2">{statusError}</div>
                )}
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                    onClick={() => setShowModal(false)}
                    disabled={statusLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    onClick={handleChangeStatus}
                    disabled={statusLoading}
                  >
                    {statusLoading ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Confirm
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default TicketDetails;