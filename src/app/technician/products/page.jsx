"use client"
import React from "react";
import AddProductModal from "../../components/addProductModal"
import TechnicianProduct from "../../components/technicianProfuct"
import { useSession } from "next-auth/react";
const Products = () => {
  const {data:session ,status}=useSession()
  if(status==="loading"){
    return <div>Loading...</div>
  }
  if(status==="unauthenticated"){
    return <div>You need to be logged in to view this page</div>
  }
  if(status==="authenticated"){

    return (
      <>
      <div className="flex flex-col justify-center md:flex-row md:justify-between w-full">
  
        <h2 className="text-2xl mb-4 font-semibold">Products</h2>
        <AddProductModal accessToken={session.user.accessToken}/>
      </div>
      <TechnicianProduct/>

      </>
    );
  }
};

export default Products;
