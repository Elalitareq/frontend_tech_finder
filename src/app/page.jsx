"use client";
import Link from "next/link";
import heroImage from "./heromage2.svg";
import Image from "next/image";
import TechnicianComponent from "./components/technicianHome";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] relative py-4">
      <div className="lg:flex lg:flex-row lg:justify-between lg:items-center">
        <div className="w-full lg:w-[50%] flex flex-col items-start">
          <h1 className="text-[12vw] text-primary md:text-6xl lg:text-6xl font-extrabold">
            PC OR LAPTOP
            <span className="text-accent"> ISSUES</span>?
          </h1>
          <p className="text-[5vw] md:w-3/4 md:text-2xl mb-8 col-span-3 text-text font-bold mt-6">
            Book a technician now to get your computer problems solved!
          </p>
          <Link
            href="/services"
            className="bg-accent text-white px-[5vw] py-[2vw] md:px-8 md:py-4 rounded text-[6vw] md:text-2xl font-semibold block hover:bg-accent-light"
          >
            Book Now
          </Link>
        </div>
        <Image
          placeholder="blur"
          src={heroImage}
          className="w-full lg:w-[40%]"
          blurDataURL="true"
          alt="hero"
        />
      </div>
      <TechnicianComponent />
    </div>
  );
}
