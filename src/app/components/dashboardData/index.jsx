"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import TicketCard from "../ticketCard";
import TechnicianProfileCreate from "../technicianProfileCreate"

const Dashboard = ({ accessToken }) => {
  const [data, setData] = useState(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState("");
  useEffect(()=>{
    api
      .get("/dashboard", {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        console.log(res)
        setData(res.data);
      }).catch((err) => {
        setError("Not a technician")
      });

  },[accessToken])

      console.log(data)
      if(error){
        return (
                  <div className="w-full text-center">
                    <h1>Create  My Technician Profile</h1>
                    <button className="px-4 py-2 bg-primary rounder mt-4" onClick={()=>setOpenCreate(true)}>Create</button>
                    {openCreate&&<TechnicianProfileCreate accessToken={accessToken} onClose={()=>setOpenCreate(false)}/>}
                  </div>
                )
      }
    return (
        <>
        {data&&
      <>
        <h1 className="text-2xl mb-4">Dashboard</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-200 rounded p-4 ">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg text-gray-600 font-semibold mb-2">Resolved Tickets</h2>
            <p className="text-gray-500 text-xl">{data.resolvedCount}</p>
          </div>
  
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg text-gray-600 font-semibold mb-2">Open Tickets</h2>
            <p className="text-gray-500 text-xl">{data.openCount}</p>
          </div>
  
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg text-gray-600 font-semibold mb-2">Processing Tickets</h2>
            <p className="text-gray-500 text-xl">{data.processingCount}</p>
          </div>
        </div>
  
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recently Posted Tickets</h2>
          <div className="bg-gray-200 rounded shadow p-4 flex flex-wrap gap-4">
            {data.recentlyPostedTickets?.map((ticket) => (
               <TicketCard
               key={ticket._id}
               ticket={ticket}
             />
            ))}
          </div>
        </div>
      </>
        }
        </>

    );
  };
  
  export default Dashboard;