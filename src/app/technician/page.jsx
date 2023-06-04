'use client'
import React from 'react'
import DashboardData from "../components/dashboardData"
import { useSession } from 'next-auth/react'

const Technician = () => {
const {data:session,status}=useSession()
if(status==="loading"){
  return <>...Loading</>
}
if(status==="unauthenticated"){
  return <>Please login to view dashboard</>
}
if(status==="authenticated"){
  return(
    <DashboardData accessToken={session.user.accessToken}/>
  )
}

}

export default Technician