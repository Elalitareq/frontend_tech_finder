'use client'
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
// import {toast,Toaster} from "react-hot-toast"

const Page = () => {
  const router = useRouter()
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
      const creds={email,password}
      console.log(creds)
      await signIn("credentials", {
        email:email,
        password,
        redirect: false,
      }).then(({ok,error}) => {
        console.log("test")
        
       if(error){
        console.log(error)
        //  toast.error("Wrong Credentials")
       }else{
        router.push("/")
        handleCloseModal()
       }
    })
    } 
  return (
    <>
    <div className='w-full h-full flex justify-center items-center'>
      <form className='w-[300px] bg-gray-600 flex flex-col gap-10 p-5 text-gray-200' onSubmit={handleLogin}>
        <h3 className="text-xl text-center w-full text-white">Login </h3>
        <label className='flex flex-col items-start gap-3'>
          Email:
          <input className='px-4 py-2 w-full' type="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label className='flex flex-col items-start gap-3'>
          Password:
          <input className='px-4 py-2 w-full' type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <button type='submit'className='bg-accent px-4 py-3 text-xl'> Login</button>
      </form>
    </div>
    </>
  )
}

export default Page