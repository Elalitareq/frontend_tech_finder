"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

const Account = () => {
  const [edit, setEdit] = useState(false);
  const navigate = useRouter();
  const { data: session, status } = useSession();
  const handleUserUpdate = (e) => {
    setEdit(false);
  };
  useEffect(() => {}, [edit]);
  if (status === "loading") {
    return <h2>loading...</h2>;
  } else if (status === "unauthenticated") {
    navigate("/");
  } else if (status === "authenticated") {
    return (
      <div className="text-gray-200 flex flex-col gap-4 max-w-[400px] relative group">
        {!edit ? (
          <FaEdit
            className="text-3xl absolute top-1 right-1 text-transparent group-hover:text-gray-500 cursor-pointer hover:text-gray-100 transision-color duration-300"
            onClick={() => setEdit(true)}
          />
        ) : (
          <FaSave
            className="text-3xl absolute top-1 right-1 text-gray-400 hover:text-gray-100 cursor-pointer transision-color duration-300"
            onClick={handleUserUpdate}
          />
        )}
        <label className="text-xl">
          First Name:
          <input
            defaultValue={session.user.name.split(" ")[0]}
            className="ml-4 px-2 py-1 text-gray-900 bg-transparent"
            readOnly={!edit}
          />
        </label>

        <label className="text-xl">
          Last Name:
          <input
            defaultValue={session.user.name.split(" ")[1]}
            className="ml-4 px-2 py-1 text-gray-900 bg-transparent"
            readOnly={!edit}
          />
        </label>
        <label className="text-xl">
          Email:
          <input
            defaultValue={session.user.email}
            className="ml-4 px-2 py-1 text-gray-900 bg-transparent"
            readOnly={!edit}
          />
        </label>
      </div>
    );
  }
};

export default Account;
