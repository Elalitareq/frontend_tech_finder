'use client'
import {  signOut } from "next-auth/react";
import { icons } from "./icons";


const LogoutButton = () => {
  return (
    <button
    href="/admin/users"
    onClick={signOut}
    className="text-l w-full flex items-center gap-[10px] mx-[8px] my-[10px] py-[8px] px-[10px] rounded-md   transition-colors duration-300 hover:bg-accent-light  text-white"
  >
    {icons.logout}
    Logout
  </button>
  )
}

export default LogoutButton