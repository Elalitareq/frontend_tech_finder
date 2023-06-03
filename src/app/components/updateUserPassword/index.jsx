"use client";
import React, { useState } from "react";
import { api } from "../../lib/axios";
import { toast } from "react-hot-toast";

const UpdateUserPassword = ({ accessToken }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(" ");
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (e) => {
    console.log(accessToken);
    e.preventDefault();
    if (handleConfirmPasswordBlur) {
      // Perform password update logic here

      api
        .patch(
          "/user/password",
          { password: oldPassword, newPassword },
          { headers: { Authorization: `Beader ${accessToken}` } }
        )
        .then((res) =>{ 
            handleCloseModal()
            toast.success("Password updated successfully")
        })
        .catch((e) => toast.error("Error updating password check credentials"));
    }
  };
  const handleConfirmPasswordBlur = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="text-left text-primary hover:text-blue-500 transition-colors duration-300"
      >
        Update Password
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-75"></div>

          <div className="relative bg-gray-200 text-gray-800 p-4 max-w-md mx-auto rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Update Password</h2>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  onBlur={handleConfirmPasswordBlur}
                />
                {passwordError && (
                  <p className="text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserPassword;
