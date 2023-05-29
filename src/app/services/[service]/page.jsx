"use client";
import React from "react";
import TechnicianCardListing from "../../components/technicianCardListing";
const Service = ({ params }) => {
  return (
    <>
      <h1 className="text-3xl font-bold w-full text-center mb-4 text-text">
        {params.service.toUpperCase()}
      </h1>

      <TechnicianCardListing service={params.service} />
    </>
  );
};

export default Service;
