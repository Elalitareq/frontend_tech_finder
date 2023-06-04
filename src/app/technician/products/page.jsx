import React from "react";
import AddProductModal from "../../components/addProductModal"

const Products = () => {
  return (
    <>
    <div className="flex flex-col justify-center md:flex-row md:justify-between w-full">

      <h2 className="text-2xl mb-4 font-semibold">Products</h2>
      <AddProductModal/>
    </div>

    </>
  );
};

export default Products;
