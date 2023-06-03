"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const links = [
  { label: "Home", href: "/technician/" },
  { label: "Tickets", href: "/technician/tickets" },
  { label: "Resolved Tickets", href: "/technician/resolved" },
  { label: "Products", href: "/technician/products" },
  { label: "Account", href: "/technician/account" },
  { label: "Technician Profile", href: "/technician/profile" },
];
const Layout = ({ children }) => {
  const pathname = usePathname();
  const checkActive = (href) => {
    let location = pathname || "";
    if (href === location) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <nav className="w-full bg-gray-800 px-5 py-4 rounded-lg text-gray-800 flex flex-wrap gap-5 justify-center">
        {links.map((link, index) => {
          return (
            <Link
              href={link.href}
              key={index}
              className={`${
                checkActive(link.href)
                  ? "bg-gray-600 text-gray-200"
                  : "bg-text"
              } px-3 py-2 rounded-md`}
            >
              {link.label}
            </Link>
          );
        })}
        
      </nav>
      <div className="md:p-8 ">{children}</div>
    </>
  );
};

export default Layout;
