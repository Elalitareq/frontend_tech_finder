import React from "react";
import "./something.css";
// import { Facebook, Instagram, Linkedin, Twitter } from "react-feather";
import { socialArray } from "./socialIcons";
import Link from "next/link";
import Image from "next/image";
const TechnicianCard = ({ data,service }) => {
  return (
    <>
      <div className="w-[250px] h-[300px] bg-gray-600 shadow-gray-500 shadow-md mb-12 rounded-md overflow-hidden hover:-translate-y-2 transition-transform duration-400">
        <Link href={`/services/${service}/${data._id}`} className="hover:cursor-pointer">
          <div className="h-[70px] bg-gray-700 flex items-center justify-around hover:bg-gray-300 transition-colors hover:transition-colors duration-300 group">
            <div className="Usericon rounded-md  bg-dark-grey overflow-hidden">
              <svg
                className="h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="user"
              >
                <path
                  fill="var(--primary-color)"
                  d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-md font-bold text-text group-hover:text-gray-600 transition-colors duration-300">
                {data.companyName.toUpperCase()}
              </p>
              <p className="text-sm font-thin text-text group-hover:text-gray-600 transition-colors duration-300">
                {data.title}
              </p>
            </div>
            <span className="h-8 w-[2px] bg-text group-hover:bg-gray-600"></span>
            <div className="flex flex-col text-text items-center group-hover:text-gray-600 transition-colors duration-300">
              {data.distance}
              <span>km</span>
            </div>
          </div>
        </Link>

        <Image src={data.image} className="Description" width="240"
    height="180"/>

        <div className="social-media">
          {data.social.slice(0, 4).map((platform, i) => {
            return (
              <a key={i} href={platform.url} target="_blank">
                {socialArray[platform.platform.toLowerCase()]}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TechnicianCard;
