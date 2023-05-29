import Link from "next/link";
import { useEffect, useState } from "react";
import dropdownStyle from "./dropdown.module.css"

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
const Dropdown = ({ session, signOut }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleClickOutside = (event) => {
      if (event.target.closest(`.${ dropdownStyle.profileDropdown}`)) {
        return;
      }
      setIsOpen(false);
    };
  
    const toggleDropdown = () => {
      setIsOpen((prevState) => !prevState);
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  
    return (
      < >
        <li className={ dropdownStyle.profileDropdown} onClick={toggleDropdown}>
          <h2>{capitalize(session.user.name.toUpperCase())}</h2>
  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${ dropdownStyle.profileIcon}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div
            className={`${ dropdownStyle.profileDropdownContent} ${
              isOpen ?  dropdownStyle.show : ""
            } `}
          >
            <Link href="/profile">Profile</Link>
            <button className={ dropdownStyle.loginButton} onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </li>
      </>
    );
  };
  export default Dropdown