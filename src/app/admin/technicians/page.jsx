"use client";
import React, { useEffect, useState } from "react";
import ReusableTable from "../../components/reusableTable";
import { useSession } from "next-auth/react";
import { api, useDynamicQuery } from "../../lib/axios";
import { Toaster, toast } from "react-hot-toast";
import CustomPagination from "../../components/pagination";
const Technicians = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const requestConfig = {
    method: "get",
    url: `/technician/all?limit=10&page=${currentPage}`,
  };
  const {
    data: technicians,
    error,
    isLoading,
    refetch,
  } = useDynamicQuery(["technicians",currentPage], requestConfig);
  const columns = [
    { heading: "Name", accessor: "companyName", type: "text" },
    { heading: "Title", accessor: "title", type: "text" },
    { heading: "Aproved", accessor: "aproved", type: "boolean" },
  ];
  function handleSwitchChange(id, value) {
    api
      .patch(
        `/technician/aprove/${id}`,
        { aproved: value },
        { headers: { Authorization: `Bearer ${session.user?.accessToken}` } }
      )
      .then((res) => {
        if (res.data.succes) {
          toast.success("Technician Updated Successfuly");
        }
      });

  }

  return (
    <div className="bg-gray-300 flex flex-col justify-between h-full rounded-md overflow-hidden ">
      <ReusableTable
        columns={columns}
        data={isLoading ? [] : technicians.technicians}
        isLoading={isLoading}
        handleSwitchChange={handleSwitchChange}
      />
      <CustomPagination
        currentPage={currentPage}
        totalPages={isLoading ? 1 : technicians.lastPage}
        onPageChange={(e, page) => setCurrentPage(page)}
        variant="text"
        className="pt-2 pb-3 justify-center  flex text-text bg-gray-600"
      />
      <Toaster position="top-right"/>
    </div>
  );
};

export default Technicians;
