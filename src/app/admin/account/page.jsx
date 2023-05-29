'use client'
import {useSession} from "next-auth/react"
import { useDynamicQuery } from "../../lib/axios"
import ImageInput2 from "../../components/imageInput"
import { useState } from "react"
const Account = () => {
    const [image,setImage]=useState(null)
    const {data:session}=useSession()
    const requestConfig= {
      url:"/user/self",
      headers:{Authorization: "Bearer "+session.user.accessToken},
      method:"get"
    }
    const {isLoading, data, error} = useDynamicQuery(["profile"],requestConfig)
    console.log(data)
  if(isLoading){
    return <div>...Loading</div>

  }
  else{
    return  <div className="w-full h-full flex flex-col items-center relative">
      <ImageInput2 setImage={setImage}/>
      <div className=" flex flex-col  w-[900px] h-[calc(100%-100px)] text-xl p-16 text-text font-bold text-center mt-[100px] rounded-lg pt-[216px] items-start border-4 ">
        <label className="text-text font-bold mb-4 flex justify-between items-center w-full">
          First Name:
          <input className="bg-transparent text-xl ml-2  py-3 px-5 border-b-4"/>
          </label>
        <label className="text-text font-bold mb-4 flex justify-between items-center w-full">
          Last Name:
          <input className="bg-transparent text-xl ml-2  py-3 px-5 border-b-4"/>
          </label>
        <label className="text-text font-bold mb-4 flex justify-between items-center w-full">
         Email:
          <input className="bg-transparent text-xl ml-2  py-3 px-5 border-b-4"/>
          </label>
        <label className="text-text font-bold mb-4 flex justify-between items-center w-full">
          Date Of Birth:
          <input className="bg-transparent text-xl ml-2  py-3 px-5 border-b-4"/>
          </label>
         </div>
      </div>
  }
}

export default Account
