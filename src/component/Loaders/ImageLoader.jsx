import React from 'react'

export default function ImageLoader() {
    return (
        <div className='px-4 flex justify-start'>
            <div className="flex flex-col items-center gap-4 mt-6">
                {/* image box */}
                <div className="relative w-[280px] sm:w-[340px] md:w-[420px] h-[220px] rounded-xl overflow-hidden border border-gray-200">

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

                    {/* Blur overlay */}
                    <div className="absolute inset-0 backdrop-blur-sm" />
                </div>

                {/* Text */}
                <p className="text-sm text-gray-500 animate-pulse">
                    Generating image, please wait...
                </p>
            </div>
        </div>
    );
}
