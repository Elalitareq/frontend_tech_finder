'use client'

import React, { useEffect, useState } from 'react'
import TicketListing from "../components/ticketListing"
import {useSession} from "next-auth/react"
const Tcikets = () => {
    const {data:session,status} = useSession()
const [tcikets, setTcikets] = useState([])

  return (
    <>
    <div className='w-full'>
        {status==="authenticated"&&<TicketListing accessToken={session.user.accessToken}/>}
    
    </div>
    </>
  )
}

export default Tcikets