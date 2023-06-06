import React from 'react';
import Image from "next/image"

const TechnicianProducts = () => {
  // Fake array of objects
  const fakeProducts = [
    {
      _id: 1,
      title: 'Product 1',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RH7EGqNrbSZfUf8i4mG88XCr91oswJMuFA',
    },
    {
      _id: 2,
      title: 'Product 2',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RH7EGqNrbSZfUf8i4mG88XCr91oswJMuFA',
    },
    {
      _id: 3,
      title: 'Product 3',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RH7EGqNrbSZfUf8i4mG88XCr91oswJMuFA',
    },
    // Add more fake products as needed
  ];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {fakeProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white w-[200px] h-[300px] shadow-lg rounded-lg p-4"
        >
          <div className="mb-4">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            View Products
          </button>
        </div>
      ))}
    </div>
  );
};

export default TechnicianProducts;
