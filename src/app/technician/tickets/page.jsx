"use client";
import React, { useEffect, useState } from "react";
import TicketModal from "../../components/ticketModal";
import TicketCard from "../../components/ticketCard";
import { api } from "../../lib/axios";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState([]);

  const updateStatus = (value) => {
    // Handle status update here
    api
      .put(`/tickets/${selectedTicket._id}`, { status: value })
      .then((res) => {
        toast.success(`Stutus updated to ${value}`);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setOpenUpdateStatus(false);
      });
  };

  const handleViewDetails = (ticketId) => {
    const ticket = tickets.find((ticket) => ticket._id === ticketId);
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated") {
    return <div>Please login to view tickets</div>;
  } else if (status === "authenticated") {
    firstLoad &&
      api
        .get("/tickets/technician/tickets", {
          headers: { Authorization: "Bearer " + session.user.accessToken },
        })
        .then(({ data }) => {
          setTickets(data.tickets);
        })
        .finally(() => {
          setFirstLoad(false);
        });

    return (
      <>
        <h2 className="text-2xl mb-4">My Tickets</h2>
        <div className="flex flex-wrap gap-10">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onViewDetails={handleViewDetails}
            />
          ))}

          {selectedTicket && (
            <TicketModal
              ticket={selectedTicket}
              onClose={handleCloseModal}
              updateStatus={() => setOpenUpdateStatus(true)}
            />
          )}
        </div>

        {openUpdateStatus && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl mb-4">Update Ticket Status</h2>
              <div className="flex gap-4">
                <button
                  onClick={(e) => updateStatus("open")}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Open
                </button>
                <button
                  onClick={(e) => updateStatus("proccessing")}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Processing
                </button>
                <button
                  onClick={(e) => updateStatus("resovled")}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Resolved
                </button>
              </div>
              <button
                onClick={() => setOpenUpdateStatus(false)}
                className="text-gray-600 px-4 py-2 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <Toaster />
      </>
    );
  }
};

export default Tickets;
