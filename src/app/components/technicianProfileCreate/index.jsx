"use client";
import React, { useState } from "react";
import {api} from "../../lib/axios";

const CreateTechnicianModal = ({ accessToken,onClose }) => {
  const [formPart, setFormPart] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    address: "",

    image: "",
    tel: "",
    location: { lat: "", long: "" },
    aproved: false,
    workEmail: "",
    website: "",
    social: [{ platform: "", url: "" }],
    schedule: {
      monday: { status: "", from: "", to: "" },
      tuesday: { status: "", from: "", to: "" },
      wednesday: { status: "", from: "", to: "" },
      thursday: { status: "", from: "", to: "" },
      friday: { status: "", from: "", to: "" },
      saturday: { status: "", from: "", to: "" },
      sunday: { status: "", from: "", to: "" },
    },
    services: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: {
        ...prevFormData.location,
        [name]: parseFloat(value),
      },
    }));
  };

  const handleSocialChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedSocial = [...prevFormData.social];
      updatedSocial[index] = {
        ...updatedSocial[index],
        [name]: value,
      };
      return {
        ...prevFormData,
        social: updatedSocial,
      };
    });
  };

  const handleScheduleChange = (e, day) => {
    console.log(formData)
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      schedule: {
        ...prevFormData.schedule,
        [day]: {
          ...prevFormData.schedule[day],
          [name]: value,
        },
      },
    }));
  };
  const handleAddSocial = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      social: [...prevFormData.social, { platform: "", url: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/technician", formData, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      console.log(response.data); // Do something with the response
      // Reset the form data
      setFormData({
        companyName: "",
        title: "",
        address: "",
        image: "",
        tel: "",
        location: { lat: "", long: "" },
        aproved: false,
        workEmail: "",
        website: "",
        social: [{ platform: "", url: "" }],
        schedule: {
          monday: { status: "", from: "", to: "" },
          tuesday: { status: "", from: "", to: "" },
          wednesday: { status: "", from: "", to: "" },
          thursday: { status: "", from: "", to: "" },
          friday: { status: "", from: "", to: "" },
          saturday: { status: "", from: "", to: "" },
          sunday: { status: "", from: "", to: "" },
        },
        services: [],
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      let updatedServices = [...prevFormData.services];
      if (checked) {
        // Add the service to the array if it's checked and not already present
        if (!updatedServices.includes(value)) {
          updatedServices.push(value);
        }
      } else {
        // Remove the service from the array if it's unchecked and present
        updatedServices = updatedServices.filter(
          (service) => service !== value
        );
      }
      return {
        ...prevFormData,
        services: updatedServices,
      };
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-gray-800 z-50 ">
      <div className="max-w-xl p-6 bg-white rounded-lg relative">
        <h2 className="text-xl font-semibold mb-4">Create Technician</h2>
              <span className="absolute text-gray-500 hover:text-gray-900 right-3 top-3 p-2 cursor-pointer font-bold" onClick={()=>onClose()}>X</span>
        <form onSubmit={handleSubmit}>
          <div className="pb-12 relative">
            {formPart === 1 && (
              <>
                <div className="flex flex-wrap gap-4 justify-around">
                  <div className="mb-4">
                    <label
                      htmlFor="companyName"
                      className="block mb-1 font-medium"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-1 font-medium">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block mb-1 font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="image" className="block mb-1 font-medium">
                      Image
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="tel" className="block mb-1 font-medium">
                      Telephone
                    </label>
                    <input
                      type="text"
                      id="tel"
                      name="tel"
                      value={formData.tel}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
            
                <button
                  className="px-3 py-2 bg-primary text-gray-200 absolute right-3 bottom-3 "
                  onClick={() => setFormPart((prev) => prev + 1)}
                >
                  Next
                </button>
              </>
            )}
            {formPart === 2 && (
              <>
                <div className="flex flex-wrap gap-4 justify-around">
                  <div className="mb-4">
                    <label htmlFor="lat" className="block mb-1 font-medium">
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="lat"
                      name="lat"
                      value={formData.location.lat}
                      onChange={handleLocationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="long" className="block mb-1 font-medium">
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="long"
                      name="long"
                      value={formData.location.long}
                      onChange={handleLocationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="workEmail"
                      className="block mb-1 font-medium"
                    >
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="website" className="block mb-1 font-medium">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <button
                  className="px-3 py-2 bg-primary text-gray-200 absolute left-3 bottom-3 "
                  onClick={() => setFormPart((prev) => prev - 1)}
                >
                  Back
                </button>
                <button
                  className="px-3 py-2 bg-primary text-gray-200 absolute right-3 bottom-3 "
                  onClick={() => setFormPart((prev) => prev + 1)}
                >
                  Next
                </button>
              </>
            )}

            {formPart === 3 && (
              <>
                <div className="flex flex-wrap gap-4 justify-around">
                  <div className="mb-4 ">
                    <legend className="block mb-1 font-medium ">
                      Social Media
                    </legend>
                    {formData.social.map((social, index) => (
                      <div key={index} className="flex gap-2 mb-4">
                        <input
                          type="text"
                          name="platform"
                          value={social.platform}
                          onChange={(e) => handleSocialChange(e, index)}
                          placeholder="Platform"
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        />
                        <input
                          type="url"
                          name="url"
                          value={social.url}
                          onChange={(e) => handleSocialChange(e, index)}
                          placeholder="URL"
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-3 py-2 rounded"
                      onClick={handleAddSocial}
                    >
                      Add Social Media
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Services</label>
                    <div className="flex gap-2">
                      <label htmlFor="laptops">
                        <input
                          type="checkbox"
                          id="laptops"
                          className="mr-3"
                          name="services"
                          value="laptops"
                          checked={formData.services.includes("laptops")}
                          onChange={handleServiceChange}
                        />
                        Laptops
                      </label>
                      <label htmlFor="tablets">
                        <input
                          type="checkbox"
                          id="tablets"
                          name="services"
                          className="mr-3"
                          value="tablets"
                          checked={formData.services.includes("tablets")}
                          onChange={handleServiceChange}
                        />
                        Tablets
                      </label>
                      <label htmlFor="desktops">
                        <input
                          type="checkbox"
                          className="mr-3"
                          id="desktops"
                          name="services"
                          value="desktops"
                          checked={formData.services.includes("desktops")}
                          onChange={handleServiceChange}
                        />
                        Desktops
                      </label>
                      <label htmlFor="screens">
                        <input
                          type="checkbox"
                          className="mr-3"
                          id="screens"
                          name="services"
                          value="screens"
                          checked={formData.services.includes("screens")}
                          onChange={handleServiceChange}
                        />
                        Screens
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="px-3 py-2 bg-primary text-gray-200 absolute left-3 bottom-3 "
                  onClick={() => setFormPart((prev) => prev - 1)}
                >
                  Back
                </button>
                <button
                  className="px-3 py-2 bg-primary text-gray-200 absolute right-3 bottom-3 "
                  onClick={() => setFormPart((prev) => prev + 1)}
                >
                  Next
                </button>
              </>
            )}
            {formPart === 4 && (
              <>
                <div className="flex flex-wrap gap-4 justify-around">
                  {/* schedule */}
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Schedule</label>
                    {Object.keys(formData.schedule).map((day) => (
                      <div key={day} className="flex gap-2">
                        <label className="block">
                          {capitalizeFirstLetter(day)}:
                        </label>
                        <select
                          name={`status`}
                          value={formData.schedule[day].status}
                          onChange={(e) => handleScheduleChange(e, day)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          required
                        >
                          <option value="">Select status</option>
                          <option value="open">Open</option>
                          <option value="closed">Closed</option>
                        </select>
                        <input
                          type="time"
                          name={`from`}
                          value={formData.schedule[day].from}
                          onChange={(e) => handleScheduleChange(e, day)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          disabled={formData.schedule[day].status === "closed"}
                        />
                        <input
                          type="time"
                          name={`to`}
                          value={formData.schedule[day].to}
                          onChange={(e) => handleScheduleChange(e, day)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          disabled={formData.schedule[day].status === "closed"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="px-3 py-2 bg-primary text-gray-200 absolute left-3 bottom-3 "
                  onClick={() => setFormPart((prev) => prev - 1)}
                >
                  Back
                </button>
            <button
              type="submit"
                  className="px-3 py-2 bg-primary text-gray-200 absolute right-3 bottom-3 "
            >
              Create
            </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTechnicianModal;
