'use client'
import React from "react";
import { useRouter } from "next/navigation";
// import { ge/tServerSession } from "next-auth";
// import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import Sidebar from "../../components/AdminSidebar";
import Loader from "../../components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient= new QueryClient()
export default function Layout({children}) {
  
      const router = useRouter();
        const {data:session,status}=useSession()
      if (status === "loading") {
        return (
          <>
            <Loader />
          </>
        );
      }
    
      if (status==="unauthenticated") {
        
       router.push("/") // Return null if the user is not authenticated
       return null
      }else if(status==="authenticated"){
    
          return (
            <div className=" flex flex-row h-[calc(100vh-200px)] ">
              <Sidebar />
              <div className=" w-[calc(100%-280px)] ml-8">
              <QueryClientProvider client={queryClient}>

              {children}
              </QueryClientProvider>
              </div>
            </div>
          );
      }
    }

