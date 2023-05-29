"use client";

import { icons } from "./icons";
import Link from "next/link";

const CustomLink = ({ icon, label, href ,active}) => {
  return (
    <Link
    href={href}
    className={`text-l flex items-center gap-[10px]  mx-[8px] my-[10px] py-[8px] px-[10px] rounded-md  transition-colors duration-300 ${
      active ? "bg-accent hover:bg-accent-light text-white" : "hover:bg-accent-light text-white"
    }`}

    >
      {icons[icon]}
      {label}
    </Link>
  );
};

export default CustomLink;
