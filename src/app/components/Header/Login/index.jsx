import Link from "next/link";
import loginStyle from "./login.module.css";
import {  signOut, useSession } from "next-auth/react";
import {  useState } from "react";
import React from "react";
import Dropdown from "./Dropdown";
import LoginModal from "../../LoginModal";
// import {UserIcon} from "@heroicons/react/24/solid"

export const Login = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: session, status } = useSession();
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };
  if (status === "loading") {
    return <p>...</p>;
  } else if (status === "unauthenticated") {
    return (
      < >
          <button
            className={`${loginStyle.loginButton} lg:text-2xl`}
            onClick={handleLoginModalOpen}
          >
            Login
          </button>
        <LoginModal
          showLoginModal={showLoginModal}
          handleCloseModal={handleCloseModal}
        />
      </ >
    );
  } else if (status === "authenticated") {
    // return <button onClick={signOut}>logout</button>

    return <Dropdown session={session} signOut={signOut} />;
  }
};



