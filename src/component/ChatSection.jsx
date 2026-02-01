import React, { useState } from 'react'
import UseAiLoader from '../hooks/UseAiLoader';
import { marked } from 'marked';
import UseChat from '../hooks/UseChat';
import '../component/style/Response.css'
import { FiFileText } from 'react-icons/fi';
import ImgPreview from './ImgPreview';

export default function ChatSection() {
  const { aiLoader, thinking } = UseAiLoader();
  const { state } = UseChat();
  const messages = state?.messages ?? state ?? [];
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="max-w-7xl mx-auto text-gray-50 py-4 pr-5">
      {/* Image preview */}
      {selectedImg && (<ImgPreview
        image={selectedImg}
        setSelectedImg={setSelectedImg} />
      )}

      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {messages.map((itm, index) => (
          <div
            key={index}
            className={`flex w-full ${itm.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${itm.role === "user"
                ? "bg-zinc-700/40 shadow-sm max-w-lg"
                : "w-full"
                }`}
              style={{ maxWidth: itm.role === "user" ? "70%" : "100%" }}
            >
              {/* File preview */}
              {itm.role === "user" && itm.file_name && (
                <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200">

                  {/* Icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <FiFileText size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {itm.file_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Ready for analysis
                    </p>
                  </div>
                </div>
              )}

              {/* message content */}
              {itm.role === "assistant" ? (
                itm.message_type === "image" ? (
                  <img
                    onClick={() => setSelectedImg(itm.message)}
                    src={itm.content ?? itm.message}
                    alt="assistant"
                    className="mt-2 rounded-xl max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[520px] h-auto object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    className="markdown"
                    dangerouslySetInnerHTML={{
                      __html: marked((itm.content ?? itm.message) || "", {
                        gfm: true,
                        breaks: true,
                      }),
                    }}
                  />
                )
              ) : (
                <p className="whitespace-pre-wrap">
                  {itm.content ?? itm.message}
                </p>
              )
              }
            </div>
          </div>
        ))}

        {/* Loader */}
        {aiLoader && (
          <div className="flex justify-start">
            <div className="px-4 py-2">
              <div className="h-4 w-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {thinking && (
          <div className='flex justify-start'>
            <div className='px-4 py-2'>
              <span className="animate-pulse">Reading document...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}