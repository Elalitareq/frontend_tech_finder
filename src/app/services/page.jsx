import React from "react";
import ServicesCardListing from "../components/serviceCardListing";

const Services = () => {
  return (
    <div className=" min-h-[calc(100vh-10rem)]  ">
      <h1 className="text-5xl  font-semibold text-text text-center mb-12 ">Services</h1>

      <ServicesCardListing />
    </div>
  );
};

export default Services;
