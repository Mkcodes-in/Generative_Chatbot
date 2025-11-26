import React from 'react'
import { LuCircleFadingPlus } from 'react-icons/lu'

export default function Button({btnName, btnLink}) {
    return (
        <button className='w-full bg-[#43454A] border border-gray-50/13 rounded-full flex items-center justify-center gap-2 py-2 font-semibold cursor-pointer'>
            <LuCircleFadingPlus />
            {btnName}
        </button>
    )
}
