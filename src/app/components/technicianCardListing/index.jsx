"use client";
import { useEffect, useState } from "react";
import TechnicianCard from "../technicianCard";
import { api, useDynamicQuery } from "../../lib/axios";
import CustomPagination from "../pagination";

const TechnicianCardListing = ({service}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [technicians, setTechnicians] = useState([]);
//   const {data,error,isLoading}=useDynamicQuery(["users",])

  useEffect(() => {
    // Get user's coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getData({ lat: latitude, long: longitude, page: currentPage,service }).then(
          (res) => {
            setTechnicians(res);
            console.log(res);
          }
        );
      },
      (error) => {
        console.log("Error getting user's coordinates:", error);
        getData({ page: currentPage,service }).then(
          (res) => {
            setTechnicians(res);
            console.log(res);
          }
        );
      }
    );
  }, [currentPage,service]);

  return (
    <>
      <CustomPagination
        currentPage={currentPage}
        totalPages={technicians.lastPage}
        onPageChange={(e, page) => setCurrentPage(page)}
        variant="text"
        className="mb-4 justify-center md:justify-end flex text-text"
      />
      <div className="flex flex-row  max-sm:justify-center gap-[calc(100%-500px)]  min-[750px]:gap-[calc(50%-375px)] lg:gap-[calc(33.33%-334px)] 2xl:gap-[calc(20%-300px)] flex-wrap">
    
        {technicians.technicians &&
          technicians.technicians.map((technician, index) => {
            return <TechnicianCard data={technician} key={index} service={service}/>;
          })}
      </div>
    </>
  );
};

export default TechnicianCardListing;
const getData = async ({ page, long, lat,service }) => {
  const res = await api.get(
    `/technician/all?page=${page}&long=${long}&lat=${lat}&service=${service}`
  );
  return res.data;
};
