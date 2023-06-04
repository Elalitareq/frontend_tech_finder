'use client'
import React, { useState } from 'react';
import { api } from '../../lib/axios';
import { Toaster, toast } from 'react-hot-toast';

const CreateTicketModal = ({ technician }) => {
  const [open, setOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    technician: technician,
    user: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    serviceType: '',
    problem: {
      category: '',
      description: '',
      additionalDetails: '',
    },
  });

  const categories = ['Pc Parts', 'OS','Hardware', 'Software', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Make API call to create a new ticket
    api
      .post('/tickets', ticketData)
      .then((res) => {
        // Handle successful ticket creation
        console.log('Ticket created:', res.data);
        setOpen(false);
        toast.success('Ticket created successfully, the technician will get back to you soon!');
      })
      .catch((err) => {
        // Handle error
        console.error('Error creating ticket:', err);
      });
  };

  return (
    <>
      <button className="text-gray-100 bg-primary px-4 py-3 rounded hover:bg-primary-light cursor-pointer" onClick={() => setOpen(true)}>
        Book Now
      </button>
      <Toaster />
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Create Ticket</h2>

            <label className="block mb-4">
              Name:
              <input
                type="text"
                name="user.name"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Email:
              <input
                type="text"
                name="user.email"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Phone Number:
              <input
                type="text"
                name="user.phoneNumber"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Service Type:
              <input
                type="text"
                name="serviceType"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Problem Category:
              <select
                name="problem.category"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-4">
              Problem Description:
              <textarea
                name="problem.description"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              ></textarea>
            </label>

            <label className="block mb-4">
              Additional Details:
              <textarea
                name="problem.additionalDetails"
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              ></textarea>
            </label>

            <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded">
              Create Ticket
            </button>
            <button onClick={() => setOpen(false)} className="text-gray-600 px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTicketModal;
