import React from 'react'
import { api } from '../../../lib/axios'

const Technician = async({params}) => {
    const technician=await getTechnicianData(params.techId)
  return (
    <div>
        Technician
    </div>
  )
}

export default Technician

async function getTechnicianData(id){
    var res="gg"
    try{

        res=await api.get(`/technician/${id}`)
    }catch(e){
        console.log(e)
    }
    return res.data
}