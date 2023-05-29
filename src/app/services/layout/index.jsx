"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
    {/* <QueryClientProvider QueryClient={QueryClient}> */}
        {children}
    {/* </QueryClientProvider> */}
        
    </>
  );
};

export default Layout;
