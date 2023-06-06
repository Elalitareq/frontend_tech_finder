'use client'
import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { Toaster, toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const CreateTicketModal = ({ technician }) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [problem, setProblem] = useState({
    category: '',
    description: '',
    additionalDetails: '',
  });
  const [ticketData, setTicketData] = useState({
    technician: technician,
    user: user,
    serviceType: '',
    problem: problem,
    userId: '',
  });

  const categories = ['Pc Parts', 'OS', 'Hardware', 'Software', 'Other'];

  useEffect(() => {
    if (status === 'authenticated') {
      setUser({
        name: session.user.name,
        email: session.user.email,
        phoneNumber: '',
      });
      setTicketData((prevState) => ({
        ...prevState,
        user: {
          name: session.user.name,
          email: session.user.email,
          phoneNumber: '',
        },
        userId: session.user.id,
      }));
    }
  }, [status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('user.')) {
      setUser((prevState) => ({
        ...prevState,
        [name.split('.')[1]]: value,
      }));
    } else if (name.includes('problem.')) {
      setProblem((prevState) => ({
        ...prevState,
        [name.split('.')[1]]: value,
      }));
    }
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
        setOpen(false);
        toast.success('Ticket created successfully. The technician will get back to you soon!');
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        toast.error('Please fill all the fields.');
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
                value={user.name}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Email:
              <input
                type="text"
                name="user.email"
                value={user.email}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Phone Number:
              <input
                type="text"
                name="user.phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Service Type:
              <input
                type="text"
                name="serviceType"
                value={ticketData.serviceType}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>

            <label className="block mb-4">
              Problem Category:
              <select
                name="problem.category"
                value={problem.category}
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
                value={problem.description}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              ></textarea>
            </label>

            <label className="block mb-4">
              Additional Details:
              <textarea
                name="problem.additionalDetails"
                value={problem.additionalDetails}
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
