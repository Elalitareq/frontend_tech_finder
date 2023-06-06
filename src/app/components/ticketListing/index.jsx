"use client";
import { api } from "../../lib/axios";
import React, { useEffect, useState } from "react";
const color={
  open:"text-green-400",
  resolved:"text-blue-400",
  processing:"text-purple-400",
}
const Tickets = ({ accessToken }) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    api
      .get("/tickets/usertickets", {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        setTickets(res.data.tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);
  return (
    <>
      <div className="text-xl text-gray-white font-bold mb-8">Tickets</div>
      {tickets&&tickets.map((tick) => {
        return (
          <div key={tick._id} className="w-[150px] p-3 h-[100px] rounded-lg bg-gray-100 font-bold ">
            <h3 key={tick.id} className="mb-4">{tick.problem.description}</h3>
            <h4 className={color[tick.status
            ]}> {tick.status}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Tickets;
