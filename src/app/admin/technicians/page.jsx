"use client";
import React, { useEffect } from "react";
import ReusableTable from "../../components/reusableTable";
import { useSession } from "next-auth/react";
import { api, useDynamicQuery } from "../../lib/axios";
const Technicians = () => {
  const { data: session } = useSession();
  const requestConfig = {
    method: "get",
    url: "/technician/all?limit=10",
  };
  const {
    data: technicians,
    error,
    isLoading,
  } = useDynamicQuery(["technicians"], requestConfig);
  console.log("technicians",technicians)
  const columns = [
    { heading: "Name", accessor: "companyName", type: "text" },
    { heading: "Title", accessor: "title", type: "text" },
    { heading: "Aproved", accessor: "aproved", type: "boolean" },
  ];
  function handleSwitchChange(id, value) {
    api.patch(
      `/technician/aprove/${id}`,
      { aprove: value },
      { headers: { Authorization: `Bearer ${session.user?.accessToken}` } }
    );
  }
  useEffect(() => {
    console.log()
  }, [technicians]);
  return (
    <div>
      <ReusableTable
        columns={columns}
        data={isLoading?[]:technicians.technicians}
        isLoading={isLoading}
        handleSwitchChange={handleSwitchChange}
      />
    </div>
  );
};

export default Technicians;
