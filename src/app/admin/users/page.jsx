"use client";
import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import  { useDynamicQuery } from "../../lib/axios";

const Users = () => {
  const { data: session } = useSession();
  const requestConfig = {
    method: 'get',
    url: '/user/users',
    headers: { Authorization: `Bearer ${session.user?.accessToken}` },
  };
  const { data, error, isLoading } = useDynamicQuery(["users"], requestConfig);
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "dob", headerName: "Date of Birth", flex: 1 },
  ];
  useEffect(()=>{

  },[data])
  const getRowId = (row) => row._id;


    return (
      <div className="h-full w-full col-span-4  row-span-6">
        <DataGrid
          rows={!isLoading?error?["There Was An Error"]:data.users:[]}
          columns={columns}
          getRowId={getRowId}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoPageSize
          sx={{
            color: "white",
          }}
          loading={isLoading}
          className="bg-gray-200 text-white"
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    );
  
};

export default Users;
