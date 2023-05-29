'use client'
import React from "react";
import "./sidebar.css";
import { icons } from "./icons";
import Link from "next/link";
import CustomLink from "./customLink";
import LogoutButton from "./logoutButton";
import {usePathname} from "next/navigation"

const Sidebar = () => {
  const router=usePathname()
  const checkActive = (href) => {
    const location = router;
    if (href === location) {
      return true;
    } else {
      return false;
    }
  };
  return (
  
    <div className="flex  h-full m-0 p-0 w-[280px]">
      <div className="inline-flex w-full  flex-col bg-gray-600  overflow-hidden text-white rounded-md">
        <CustomLink label="Home" icon="home" href="/admin" active={checkActive("/admin")} />
        <div className="line"></div>
        <CustomLink label="Users" icon="users" href="/admin/users"  active={checkActive("/admin/users")} />
        <Link
          href="/admin/users"
          className="text-l flex items-center gap-[10px] mx-[8px] my-[10px] py-[8px] px-[10px] rounded-md  transition-colors duration-300 hover:bg-accent-light  text-white"
        >
          {icons.users}
          Users
        </Link>
        <Link
          href="/admin/users"
          className="text-l flex items-center gap-[10px] mx-[8px] my-[10px] py-[8px] px-[10px] rounded-md  transition-colors duration-300 hover:bg-accent-light  text-white"
        >
          {icons.users}
          Users
        </Link>
        <Link
          href="/admin/users"
          className="text-l flex items-center gap-[10px] mx-[8px] my-[10px] py-[8px] px-[10px] rounded-md  transition-colors duration-300 hover:bg-accent-light  text-white"
        >
          {icons.users}
          Users
        </Link>
        <div className="line"></div>
        <Link
          href="/admin/users"
          className="text-l flex items-center gap-[10px] mx-[8px] my-[10px] py-[8px] px-[10px] rounded-md  transition-colors duration-300 hover:bg-accent-light  text-white"
        >
          {icons.users}
          Users
        </Link>
        <div className="bottom">
          <CustomLink label="Account" icon="account" href="/admin/account"  active={checkActive("/admin/account")}  />
        <LogoutButton/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
