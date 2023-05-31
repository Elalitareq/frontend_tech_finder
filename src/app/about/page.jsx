import React from "react";
import Image from "next/image";
import about from "../assets/vector/about.svg";
const About = () => {
  return (
    <>
    <h1 className="text-4xl text-center font-bold text-text">About Us</h1>
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)] items-center">
      <Image src={about} alt="about" className="w-full lg:w-1/2" />
      <p className="text-[4vw] lg:text-3xl text-text leading-10 px-4">
        At TechFinder, we are dedicated to simplifying the process of finding
        reliable and skilled technicians in your area. We understand the
        inconvenience and stress that come with a malfunctioning device, whether
        it&apos;s your laptop, desktop, or any other piece of technology.
        That&apos;s why we&apos;ve developed a platform that connects you with
        qualified technicians who can quickly and efficiently fix your devices.
        Our platform leverages advanced location technology to identify
        technicians near you.
      </p>
    </div>
    </>
  );
};

export default About;
