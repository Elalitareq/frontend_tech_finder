"use client";
import Link from "next/link";
import heroImage from "./assets/vector/hero image2.svg";
import Image from "next/image";
import { api } from "./lib/axios";
import TechnicianCard from "./components/technicianCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      var { latitude, longitude } = position.coords;
      getClosestFourTechnicians({
        long: longitude,
        lat: latitude,
      }).then((res) => {
        setData(res);
      });
    });
  }, []);
  return (
    <div className="min-h-[calc(100vh-200px)] relative py-4">
      <div className="   lg:flex lg:flex-row lg:justify-between lg:items-center ">
        <div className="     w-full lg:w-[50%] flex flex-col items-start">
          <h1 className=" text-[13vw] text-primary   md:text-6xl lg:text-8xl  font-extrabold">
            PC OR <span className="whitespace-nowrap">LAPTOP</span>
            <span className="text-accent"> ISSUES</span>?
          </h1>
          <p className="text-[5vw] md:w-3/4 md:text-4xl mb-8 col-span-3 text-text font-bold mt-6">
            Book a technician now to get your computer problems solved!
          </p>
          <Link
            href="/services"
            className="bg-accent text-white px-8 py-4 rounded-full text-2xl font-semibold block hover:bg-accent-light"
          >
            Book Now
          </Link>
        </div>
        <Image
          placeholder="blur"
          src={heroImage}
          className="w-full  lg:w-[40%]"
          blurDataURL="true"
          alt="hero"
        />
      </div>
      <div className="flex flex-row  max-sm:justify-center gap-[calc(100%-500px)]  min-[750px]:gap-[calc(50%-375px)] lg:gap-[calc(33.33%-334px)] 2xl:gap-[calc(20%-300px)] flex-wrap ">
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
async function getClosestFourTechnicians({ long, lat }) {
  const res = await api.get(
    `/technician/all?limit=6&page=1&long=${long}&lat=${lat}`
  );
  console.log(res.data);
  return res.data;
}
