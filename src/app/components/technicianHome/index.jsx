'use client'
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import TechnicianCard from "../technicianCard";

export default function TechnicianComponent() {
  const [data, setData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      getClosestFourTechnicians({
        long: longitude,
        lat: latitude,
      }).then((res) => {
        setData(res);
      });
    });
  }, []);

  async function getClosestFourTechnicians({ long, lat }) {
    const res = await api.get(
      `/technician/all?limit=4&page=1&long=${long}&lat=${lat}`
    );
    console.log(res.data);
    return res.data;
  }

  return (
    <div className="md:px-20 py-5 mx-auto bg-gray-800 max-w-[1300px] rounded-xl mt-8">
      <h2 className="text-2xl text-text font-bold text-center mt-8 mb-12">
        Technicians close to you
      </h2>
      <div className="flex flex-row mx-auto justify-center md:justify-between sm:justify-around flex-wrap">
        {data &&
          data.technicians.map((technician, index) => {
            return (
              <TechnicianCard
                data={technician}
                key={index}
                className="w-full md:w-1/3"
              />
            );
          })}
      </div>
    </div>
  );
}
