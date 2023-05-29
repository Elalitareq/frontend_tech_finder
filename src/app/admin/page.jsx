// 'use client'
// import React from "react";
// import Users from "./Users/page";
// import { useRouter } from "next/navigation";
// // import { ge/tServerSession } from "next-auth";
// // import { AuthOptions } from "../api/auth/[...nextauth]/route";
// import { useSession } from "next-auth/react";
// import Sidebar from "../components/AdminSidebar";
// import Loader from "../components/Loader";
// import { toast } from "react-toastify";

// export default function Admin() {
//       const router = useRouter();
//         const {data:session,status}=useSession()
//       if (status === "loading") {
//         return (
//           <>
//             <h1>gg</h1>
//             <Loader />
//           </>
//         );
//       }
    
//       if (status==="unauthenticated") {
//        toast.success("Who Are You?")
        
//        router.push("/") // Return null if the user is not authenticated
//        return null
//       }else if(status==="authenticated"){
    
//           return (
//             <div className="grid grid-cols-5 grid-rows-6 col-span-5 gap-4">
//               <Sidebar />
//               <Users session={session}/>
//             </div>
//           );
//       }
//     }
import React from 'react'

const ThisPage = () => {
  return (
    <div>ThisPage</div>
  )
}

export default ThisPage
