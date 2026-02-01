import React from 'react'
import { BiDownload, BiX } from 'react-icons/bi'

export default function ImgPreview({ image, setSelectedImg }) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={() => setSelectedImg(null)}
        >
            <div
                className="relative bg-white rounded-xl p-1 max-w-3xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => setSelectedImg(null)}
                    className="absolute top-2 right-2 text-black text-xl cursor-pointer"
                >
                    <BiX size={24}/>
                </button>

                {/* Download Button */}
                <button
                    onClick={() => setSelectedImg(null)}
                    className="absolute top-2 right-10 text-black text-xl cursor-pointer"
                >
                    <BiDownload size={22}/>
                </button>

                {/* Image Preview */}
                <img
                    src={image}
                    alt="preview"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div>
    )
}
