import React from "react";
import { api } from "../../../lib/axios";
import Image from "next/image";
import { socialArray } from "../../../components/technicianCard/socialIcons";
const Technician = async ({ params }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const technician = await getTechnicianData(params.techId);
  return (
    <div className="w-full md:w-[800px] bg-gray-600 min-h-[700px] mx-auto rounded-lg overflow-hidden">
      <div className="w-full p-4 bg-gray-300">
        <h1 className="text-3xl text-gray-600 text-center font-semibold">
          {technician.companyName}
        </h1>
      </div>
      <div className="flex p-4  flex-col md:flex-row md:justify-between">
        <Image
          src={technician.image}
          className="w-full md:w-[300px] h-auto rounded-lg border"
          width={300}
          height={300}
          alt={technician.companyName}
        />
        <div className="w-full md:w-1/2 px-0 md:px-4  text-gray-300">
          <h2 className="text-2xl my-4 md:mt-0">{technician.title}</h2>
          <h4 className="text-lg my-4">Email: {technician.workEmail}</h4>
          <h4 className="text-lg my-4">Address: {technician.address}</h4>
          <h4 className="text-lg my-4">
            Map Location: {technician.location.lat} , {technician.location.lat}
          </h4>
          <h4 className="text-lg my-4">Tel: {technician.tel}</h4>
          <div className="flex gap-8 items-center my-4">
            <h4 className="text-lg ">Social Links:</h4>
            {technician.social.map((platform) => {
              return (
                <a
                  href={platform.url}
                  key={platform._id}
                  className="text-3xl text-text "
                  target="_blank"
                >
                  {socialArray[platform.platform.toLowerCase()]}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <h4 className="text-lg my-1 p-4 text-gray-300">Working Hours:</h4>
      <div className="flex flex-row flex-wrap justify-start px-4">
        {days.map((day) => (
          <div
            key={day}
            className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl shadow-md mr-2 mb-2"
          >
            <p className="text-base text-gray-200">{day}:</p>
            {technician.schedule[day.toLowerCase()].status === "Working" ? (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-300 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1C4.477 1 0 5.477 0 11s4.477 10 10 10 10-4.477 10-10S15.523 1 10 1zm0 18a8 8 0 100-16 8 8 0 000 16z"
                    clipRule="evenodd"
                  />
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm1 9H9V8h2v5z" />
                </svg>
                <p className="text-base text-green-300">
                  {technician.schedule[day.toLowerCase()].from} -{" "}
                  {technician.schedule[day.toLowerCase()].to}
                </p>
              </div>
            ) : (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-200 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1C4.477 1 0 5.477 0 11s4.477 10 10 10 10-4.477 10-10S15.523 1 10 1zm1 16H9v-2h2v2zm0-4H9V7h2v6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-base text-red-300">Closed</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 text-right md:text-center"><button className="text-gray-100 bg-primary px-4 py-3 rounded-full hover:bg-primary-light cursor-pointer">Book Now</button></div>
    </div>
  );
};

export default Technician;

async function getTechnicianData(id) {
  var res = "gg";
  try {
    res = await api.get(`/technician/${id}`);
  } catch (e) {
    console.log(e);
  }
  return res.data;
}
