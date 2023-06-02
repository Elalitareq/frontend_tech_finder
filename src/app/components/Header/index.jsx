"use client";
import { useState,useEffect } from "react";
import headerStyle from "./Header.module.css";
import logo2 from "../../assets/vector/logo2.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Login } from "./Login";
import Link from "next/link";
import SignUpModal from "./signUpModal";
import { useSession } from "next-auth/react";
const linksArray = [
  {
    label: "Home",
    href: "/",
    extraDetails: "Extra details for Home",
  },
  {
    label: "Services",
    href: "/services",
    extraDetails: "Extra details for Services",
  },
  {
    label: "About",
    href: "/about",
    extraDetails: "Extra details for About",
  },
  {
    label: "Market Place",
    href: "/products",
    extraDetails: "Extra details for Contact",
  },
];

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const pathname = usePathname();
  const checkActive = (pathname, href) => {
    let location = pathname.split("/")[1] || "";
    if (href === `/${location}`) {
      return true;
    } else {
      return false;
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const { data: session, status } = useSession();
  return (
    <header
    className={`fixed z-10 w-full md:w-[calc(100%-8rem)] px-4 rounded md:rounded-lg md:mx-16 md:px-4 py-6 md:py-2 md:top-4 flex justify-between `}
  >
  <div class={` transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-700 z-10  ${scrollPosition > 150 ? "opacity-100" : "opacity-0"}`}></div>
      <Image
        loading="eager"
        priority={true}
        src={logo2}
        alt="logo"
        width={200}
        height={60}
        className="z-20"
      />
      <nav
        className={`md:flex md:items-center md:justify-center z-20   ${
          menuOpen ? headerStyle.open : ""
        }`}
      >
        <div className={headerStyle.menuToggle} onClick={handleMenuToggle}>
          <div className={headerStyle.bar}></div>
          <div className={headerStyle.bar}></div>
          <div className={headerStyle.bar}></div>
        </div>
        <ul
          className={`${headerStyle.menu} ${menuOpen ? headerStyle.open : ""}`}
        >
          {linksArray.map((link) => {
            return (
              <li key={link.href} className=" mb-3 md:mb-0 px-3 py-5 text-sm xl:text-lg ">
                <Link
                  className={`tracking-wild ${
                    checkActive(pathname, link.href)
                      ? "text-primary"
                      : "text-text"
                  }`}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          {status === "authenticated" && session.user.role === "admin" && (
            <li className=" mb-3 md:mb-0 px-3 py-5 text-sm xl:text-lg ">
              <Link
                href={"/admin"}
                className={`tracking-wild ${
                  checkActive(pathname, "/admin") ? "text-primary" : "text-text"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </li>
          )}
          {status === "authenticated" && session.user.role === "technician" && (
            <li className=" mb-3 md:mb-0 px-3 py-5 text-sm xl:text-lg ">
              <Link
                href={"/technician"}
                className={`tracking-wild ${
                  checkActive(pathname, "/technician")
                    ? "text-primary"
                    : "text-text"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Technician Panel
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={`z-20 ${headerStyle.accountNav}`}>
        {status === "unauthenticated" && (
          <>
            <SignUpModal />
            {/* <span className={headerStyle.separate} /> */}
          </>
        )}
        <Login />
      </div>
    </header>
  );
};

export default Header;
