'use client'
import React, { useEffect, useState } from 'react'
import TicketModal from "../../components/ticketModal"
import TicketCard from "../../components/ticketCard"
import { api } from '../../lib/axios';
import { useSession } from 'next-auth/react';

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [firstLoad,setFirstLoad]=useState(true)
  const {data:session,status}=useSession()
  const [tickets, setTickets] = useState([])
  const handleViewDetails = (ticketId) => {
    const ticket = tickets.find((ticket) => ticket._id === ticketId);
    setSelectedTicket(ticket);
  };
  
  const handleCloseModal = () => {
    setSelectedTicket(null);
  };
  if(status==="loading"){
    return <div>Loading...</div>
  }else if(status==="unauthenticated"){
    return <div>Please login to view tickets</div>
  }else if(status==="authenticated"){
    firstLoad&&api.get("/tickets/technician/tickets",{headers:{Authorization: "Bearer " + session.user.accessToken}}).then(({data})=>{
        setTickets(data.tickets)
        console.log(data)
      }).finally(()=>{

        setFirstLoad(false)
      }

    )
    return (
    <div>
      <h2 className="text-2xl mb-4">My Tickets</h2>

      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          onViewDetails={handleViewDetails}
        />
      ))}

      {selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={handleCloseModal}/>
      )}
    </div>
  );
}




};

export default Tickets