"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import UpdateUserPassword from "../../components/updateUserPassword";
import { Toaster, toast } from "react-hot-toast";
import { api } from "../../lib/axios";

const Account = () => {
  const [edit, setEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useRouter();
  const { data: session, status } = useSession();

  const handleUserUpdate = () => {
    // Perform the necessary update logic here using the userDetails state
    api
      .patch("/user/self", userDetails, {
        headers: { Authorization: "Bearer " + session.user.accessToken },
      })
      .then((res) =>{
        toast.success(" Account updated successfully Please logout and login again")
      })
      .catch((err) => toast.error("Something went wrong"));
    console.log("Updated User Details:", userDetails);
    setEdit(false);
  };

  if (status === "loading") {
    return <h2>loading...</h2>;
  } else if (status === "unauthenticated") {
    navigate.push("/");
  } else if (status === "authenticated") {
    return (
      <div className="text-gray-200 flex flex-col gap-4 max-w-[400px] relative group">
        <h2 className="text-xl font-bold p-4 pb-2 mb-2 text-center border-b">User Account</h2>
        {!edit ? (
          <FaEdit
            className="text-3xl absolute top-1 right-1 text-gray-500 md:text-transparent  md:group-hover:text-gray-500 cursor-pointer hover:text-gray-100 transision-color duration-300"
            onClick={() => setEdit(true)}
          />
        ) : (
          <FaSave
            className="text-3xl absolute top-1 right-1 text-gray-400 hover:text-gray-100 cursor-pointer transision-color duration-300"
            onClick={handleUserUpdate}
          />
        )}

        <label className="text-xl flex flex-col gap-4">
          First Name:
          <input
            type="text"
            defaultValue={session.user.name.split(" ")[0]}
            onChange={(e) =>
              setUserDetails((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }))
            }
            className={`px-2 py-1 text-gray-900 ${
              edit ? "bg-gray-300" : "bg-transparent"
            }`}
            readOnly={!edit}
          />
        </label>

        <label className="text-xl flex flex-col gap-4">
          Last Name:
          <input
            type="text"
            defaultValue={session.user.name.split(" ")[1]}
            onChange={(e) =>
              setUserDetails((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }))
            }
            className={`px-2 py-1 text-gray-900 ${
              edit ? "bg-gray-300" : "bg-transparent"
            }`}
            readOnly={!edit}
          />
        </label>

        <label className="text-xl flex gap-4 flex-col">
          Email:
          <input
            type="email"
            defaultValue={session.user.email}
            onChange={(e) =>
              setUserDetails((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            className={`px-2 py-1 text-gray-900 ${
              edit ? "bg-gray-300" : "bg-transparent"
            }`}
            readOnly={!edit}
          />
        </label>

        <label className="text-xl flex gap-4 flex-col">
          Date Of Birth:
          <input
            type="date"
            defaultValue={session.user.dob.split("T")[0]}
            onChange={(e) =>
              setUserDetails((prevState) => ({
                ...prevState,
                dob: e.target.value,
              }))
            }
            className={`px-2 py-1 text-gray-900 ${
              edit ? "bg-gray-300" : "bg-transparent"
            }`}
            readOnly={!edit}
          />
        </label>

        <UpdateUserPassword accessToken={session.user.accessToken} />
        <Toaster />
      </div>
    );
  }
};

export default Account;
