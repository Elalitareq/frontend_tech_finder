"use client";
import { useState } from "react";
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
    label: "Contact",
    href: "/contact",
    extraDetails: "Extra details for Contact",
  },
  {
    label: "Market Place",
    href: "/products",
    extraDetails: "Extra details for Contact",
  },
];

const Header = () => {
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
    <header className="fixed z-10 w-full   px-10 py-6 flex justify-between bg-secondary-dark md:bg-transparent">
      <Image
        loading="eager"
        priority={true}
        src={logo2}
        alt="logo"
        width={200}
        height={60}
      />
      <nav
        className={`md:flex md:items-center md:justify-center   ${
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
              <li key={link.href}>
                <Link className={`tracking-wild ${checkActive(pathname,link.href)?"text-primary":"text-text"}`} href={link.href}>
                  {link.label}
                </Link>
              </li>
            );
          })}

          {status === "authenticated" && session.user.role === "admin" && (
            <li>
              <Link href={"/admin"} className={`tracking-wild ${checkActive(pathname,"/admin")?"text-primary":"text-text"}`}>
                Admin Panel
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={headerStyle.accountNav}>
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
