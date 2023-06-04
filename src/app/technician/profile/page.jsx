"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "../../lib/axios";
import Image from "next/image";
import { FaEdit, FaMapMarkedAlt } from "react-icons/fa";
import { socialArray } from "../../components/technicianCard/socialIcons";
import EditProfileModal from "../../components/technicianSelfUpdateForm";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const { data: session, status } = useSession();
  const handleClose = (success = "") => {
    if (success === "success") {
      toast.success("Profile updated successfully");
    }

    setEdit(false);
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return <div>You are not logged in</div>;
  }
  if (status === "authenticated") {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    firstLoad &&
      api
        .get("/technician/self", {
          headers: { Authorization: "Bearer " + session.user.accessToken },
        })
        .then((res) => {
          setData(res.data.technician);
          setFirstLoad(false);
        })
        .catch((err) => console.error(err));
    return (
      <>
        {data && (
          <div className="w-full md:w-[800px]  min-h-[700px] mx-auto relative group ">
            <FaEdit
              className="text-3xl absolute top-1 right-1 text-gray-500 md:text-transparent  md:group-hover:text-gray-500 cursor-pointer hover:text-gray-100 transision-color duration-300"
              onClick={() => setEdit(true)}
            />
            <h1 className="text-3xl text-gray-200 font-bold mb-6 pb-5 border-b-4 text-center border-gray-200">
              {data.companyName}
            </h1>
            <div className="flex p-4  flex-col md:flex-row md:justify-between">
              <Image
                src={data.image}
                className="w-full md:w-[350px] h-auto rounded-lg border"
                width={350}
                height={350}
                alt={data.companyName}
              />
              <div className="w-full md:w-1/2 px-0 md:px-4  text-gray-300">
                <h2 className="text-2xl my-4 md:mt-0">{data.title}</h2>
                <h4 className="text-lg my-4">Email: {data.workEmail}</h4>
                <h4 className="text-lg my-4">Address: {data.address}</h4>
                <h4 className="text-lg my-4 flex items-center">
                  Location:
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${data.location.lat},${data.location.lat}`}
                    target="_blank"
                    className="text-gray-300 cursor-pointer hover:text-primary transition-color duration-300 "
                  >
                    {" "}
                    <FaMapMarkedAlt className="ml-4 text-2xl" />{" "}
                  </a>
                </h4>
                <h4 className="text-lg my-4">Tel: {data.tel}</h4>
                <div className="flex gap-8 items-center my-4">
                  <h4 className="text-lg ">Social Links:</h4>
                  {data.social.map((platform) => {
                    return (
                      <a
                        href={platform.url}
                        key={platform._id}
                        className="text-3xl text-text hover:text-primary transition-color duration-300 "
                        target="_blank"
                      >
                        {socialArray[platform.platform.toLowerCase()]}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <h4 className="text-lg my-1 p-4 text-gray-300">Working Hours:</h4>
            <div className="flex flex-row flex-wrap justify-start px-4">
              {days.map((day) => (
                <div
                  key={day}
                  className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl shadow-md mr-2 mb-2"
                >
                  <p className="text-base text-gray-200">{day}:</p>
                  {data.schedule[day.toLowerCase()].status === "Working" ? (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-300 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1C4.477 1 0 5.477 0 11s4.477 10 10 10 10-4.477 10-10S15.523 1 10 1zm0 18a8 8 0 100-16 8 8 0 000 16z"
                          clipRule="evenodd"
                        />
                        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm1 9H9V8h2v5z" />
                      </svg>
                      <p className="text-base text-green-300">
                        {data.schedule[day.toLowerCase()].from} -{" "}
                        {data.schedule[day.toLowerCase()].to}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-200 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1C4.477 1 0 5.477 0 11s4.477 10 10 10 10-4.477 10-10S15.523 1 10 1zm1 16H9v-2h2v2zm0-4H9V7h2v6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-base text-red-300">Closed</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {edit && (
              <EditProfileModal
                onClose={handleClose}
                data={data}
                accessToken={session.user.accessToken}
              />
            )}
            <Toaster />
          </div>
        )}
      </>
    );
  }
};

export default Profile;
