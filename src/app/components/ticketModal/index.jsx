import React from 'react';

const TicketModal = ({ ticket, onClose,updateStatus }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Ticket Details</h2>

        <p>
          <span className="font-semibold">Technician:</span> {ticket.technician}
        </p>

        <p>
          <span className="font-semibold">User Name:</span> {ticket.user.name}
        </p>

        <p>
          <span className="font-semibold">User Email:</span> {ticket.user.email}
        </p>

        <p>
          <span className="font-semibold">User Phone Number:</span>{' '}
          {ticket.user.phoneNumber}
        </p>

        <p>
          <span className="font-semibold">Service Type:</span> {ticket.serviceType}
        </p>

        <p>
          <span className="font-semibold">Problem Category:</span>{' '}
          {ticket.problem.category}
        </p>

        <p>
          <span className="font-semibold">Problem Description:</span>{' '}
          {ticket.problem.description}
        </p>

        <p>
          <span className="font-semibold">Additional Details:</span>{' '}
          {ticket.problem.additionalDetails}
        </p>

        <p>
          <span className="font-semibold">Status:</span> {ticket.status} <button className="text-sm text-blue-300 hover:text-blue-500 transition-colors duration-300" onClick={updateStatus}> Update status</button>
        </p>

        <button
          onClick={onClose}
          className="bg-primary text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TicketModal;
