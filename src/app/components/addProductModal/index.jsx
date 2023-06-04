'use client'
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { api } from "../../lib/axios";

const AddProductModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image,setImage]=useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
const onClose=()=>{
    setIsOpen(false);
}
  const handleSubmit = (e) => {
    e.preventDefault();
    // posting product function
    // onSubmit({ name, description, price, brand, category });
    //
    setName("");
    setDescription("");
    setPrice("");
    setBrand("");
    setCategory("");
    onClose();
  };

  return (
    <>
      <button className="font-bold text-2xl" onClick={()=>setIsOpen(true)}>
        <FaPlus />
      </button>
      {isOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 text-gray-700 `}>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75"></div>
          <div className="bg-white rounded-lg p-8 shadow-lg z-10 ">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="brand" className="block font-medium mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
