import React from 'react'
import { LuCircleFadingPlus } from 'react-icons/lu'

export default function Button({ btnName, btnLink }) {
    return (
        <button
            className="w-full bg-[#43454A] border border-white/10 rounded-full
            flex items-center justify-center gap-2 py-2 font-semibold cursor-pointer transition-all duration-150
            active:scale-[0.97] active:shadow-md
            hover:brightness-110"
        >
            <LuCircleFadingPlus size={18} strokeWidth={1.4} className="opacity-80" />
            {btnName}
        </button>
    )
}
