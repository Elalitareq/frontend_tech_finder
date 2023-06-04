import React from 'react';

const TicketCard = ({ ticket, onViewDetails }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{ticket.serviceType}</h3>
      <p className="text-gray-600 mb-4">Status: {ticket.status}</p>
      <button
        onClick={() => onViewDetails(ticket._id)}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        View Details
      </button>
    </div>
  );
};

export default TicketCard;
