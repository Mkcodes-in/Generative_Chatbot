import React from 'react'
import { RiLoader2Line } from 'react-icons/ri'

export default function Loader() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-[#212121]'>
        <RiLoader2Line color='white' size={22} className='animate-spin duration-300 ease-in-out'/>
    </div>
  )
}
