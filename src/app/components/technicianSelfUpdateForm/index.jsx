"use client";
import Image from "next/image";

import React, { useState } from "react";
import { api } from "../../lib/axios";
import { toast } from "react-hot-toast";

const EditProfileModal = ({ data, onClose,accessToken }) => {
  const [technicianUpdate, setTechnicianUpdate] = useState({ ...data });
  const [previewImage, setPreviewImage] = useState(null);
  const [image,setImage]=useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechnicianUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file)

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSocialInputChange = (e, platform) => {
    const { value } = e.target;
    setTechnicianUpdate((prevState) => ({
      ...prevState,
      social: prevState.social.map((item) =>
        item.platform === platform ? { ...item, url: value } : item
      ),
    }));
  };

  const handleSubmit = () => {
    // Make API call to update technician details
    if(image){

        const formData=new FormData();
        formData.append("image",image);
        api.post("https://api.imgbb.com/1/upload?key=0e5bf6ce03a2da6af74680937a7b8683",formData).then(res=>{
            let imageUrl = res.data.data.image.url
    
            api
              .patch(`/technician/${data._id}`, {...technicianUpdate,image:imageUrl},{headers:{Authorization:"Bearer " + accessToken}})
              .then((res) => {
                // Handle successful update
                onClose("success");
              })
              .catch((err) => {
                // Handle error
                console.error("Error updating technician details:", err);
              });
        })
    }
    else{

            api
              .patch(`/technician/${data._id}`,technicianUpdate,{headers:{Authorization:"Bearer " + accessToken}})
              .then((res) => {
                // Handle successful update
                console.log("Technician details updated:", res.data);
                onClose("success");
              })
              .catch((err) => {
                // Handle error
                console.error("Error updating technician details:", err);
              });

    }
  };

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 pt-40 md:pt-10 overflow-y-scroll min-h-screen text-black">
      <div className="bg-white p-6 rounded-lg z-50 relative w-full md:w-3/4">
        <span
          className="absolute top-6 right-3 text-gray-600 px-2 bg-red-300 hover:bg-red-500 hover:text-gray-800 rounded-full cursor-pointer transision-color duration-300"
          onClick={onClose}
        >
          X
        </span>

        <h2 className="text-2xl mb-4">Edit Technician Details</h2>
        <div className=" flex flex-wrap flex-col md:flex-row md:justify-between">

        <fieldset className="border border-solid border-gray-300 p-3 columns-1  md:columns-2 mb-7 w-full md:w-[60%]">
          <legend>Info</legend>

          <label className="block mb-4">
            Name Or Company Name:
            <input
              type="text"
              name="companyName"
              defaultValue={data.companyName}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </label>
          <label className="block mb-4">
            Title:
            <input
              type="text"
              name="title"
              defaultValue={data.title}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </label>

          <label className="block mb-4">
            Email:
            <input
              type="text"
              name="workEmail"
              defaultValue={data.workEmail}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </label>

          <label className="block mb-4">
            Address:
            <input
              type="text"
              name="address"
              defaultValue={data.address}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </label>

          <label className="block mb-4">
            Website:
            <input
              type="text"
              name="website"
              defaultValue={data.website}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </label>
          <label className="block mb-4">
            Tel:
            <input
              type="text"
              name="tel"
              defaultValue={data.tel}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </label>
        </fieldset>
        <fieldset className="border border-solid border-gray-300 p-3 mb-7  w-full md:w-1/4">
            <legend>Image:</legend>
          <div className="mb-4 md:h-[230px] md:w-[250px]">
            {previewImage && (
              <Image
                width="300"
                height="300"
                src={previewImage}
                alt="Preview"
                className="mb-2 rounded w-40 h-40 object-cover"
              />
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
        </fieldset>
        <fieldset className="border border-solid border-gray-300 p-3 w-full md:w-1/2">
          <legend className="text-lg font-bold mb-2">
            Social Media Accounts:
          </legend>
          {data.social.map((platform) => (
            <label key={platform.platform} className="block mb-2">
              {platform.platform} URL:
              <input
                type="text"
                name={platform.platform}
                defaultValue={platform.url}
                onChange={(e) => handleSocialInputChange(e, platform.platform)}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>
          ))}
        </fieldset>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          onClick={onClose}
          className="text-gray-600 px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
