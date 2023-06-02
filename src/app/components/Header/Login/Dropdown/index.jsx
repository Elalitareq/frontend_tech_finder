import Link from "next/link";
import { useEffect, useState } from "react";

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const Dropdown = ({ session, signOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target.closest(`.dropdownParent`)) {
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
    <>
      <li
        className="flex relative items-center font-semibold text-xl text-primary group dropdownParent cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2>{capitalize(session.user.name.toUpperCase())}</h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 rounded-md bg-primary ml-4 text-text"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div
          className={`flex w-full flex-col items-start absolute top-16 right-0 bg-white shadow-sm rounded-md p-4 ${
            isOpen
              ? "visible opacity-100 translate-y-0 transition-all duration-500"
              : "invisible opacity-0 translate-y-12 transition-all duration-500"
          } `}
        >
          <Link
            className="rounded w-full block text-gray-500 transition-colors duration-300 hover:text-accent px-3 py-2 no-underline  text-center"
            href="/profile"
          >
            Profile
          </Link>
          <button
            className="bg-accent text-text rounded cursor-pointer hover:bg-accent-light transition-all duration-300 w-full mt-3 px-3 py-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </li>
    </>
  );
};
export default Dropdown;
