import React from "react";
import Image from "next/image";
import about from "../assets/vector/about.svg";
import guy from "../assets/vector/Tarek branding -03.svg"
import guy2 from "../assets/vector/Tarek branding -02.svg"

const About = () => {
  return (
    <div className="max-w-[1200px] m-auto">
      <h1 className="text-4xl mb-12 text-center font-bold text-text">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-32">
        <div className="w-[95%] lg:w-1/2  lg:min-h-[400px]  rounded-xl">
          <Image
            src={about}
            alt="about"
            className="w-full"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxOyIgLz4KPC9zdmc+Cg=="
          />
        </div>
        <div className="w-[95%] lg:w-1/2 bg-gray-200 min-h-[600px] p-10 lg:p-20 rounded-xl overflow-hidden relative">

          <p className="text-[4vw] lg:text-2xl text-gray-700 leading-10 font-semibold">
            At TechFinder, we are dedicated to simplifying the process of
            finding reliable and skilled technicians in your area. We understand
            the inconvenience and stress that come with a malfunctioning device,
            whether it&apos;s your laptop, desktop, or any other piece of
            technology.
          </p>
          <p className="text-[4vw] lg:text-2xl text-gray-700 leading-10 font-semibold">
            That&apos;s why we&apos;ve developed a platform that connects you
            with qualified technicians who can quickly and efficiently fix your
            devices. Our platform leverages advanced location technology to
            identify technicians near you.
          </p>
          <Image src={guy} width="200" height="200" alt="guy" className="absolute top-2 right-4 opacity-20"/>
          <Image src={guy2} width="200" height="200" alt="guy" className="absolute bottom-8 left-3 opacity-20"/>
        </div>
      </div>
    </div>
  );
};

export default About;
