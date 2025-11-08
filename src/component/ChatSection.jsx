import React from 'react'
import UseChat from '../hooks/UseChat'
import UseAiLoader from '../hooks/UseAiLoader';
import { marked } from 'marked';

export default function ChatSection() {
  const { state } = UseChat();
  const { aiLoader } = UseAiLoader();

  return (
    <section className="max-w-7xl mx-auto text-gray-50 p-4">
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {state.messages.map((itm, index) => (
          <div
            className={`flex ${itm.role === "user" ? "justify-end" : "justify-start"}`}
            key={index}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${itm.role === "user" ? "bg-zinc-700/40 shadow-sm max-w-lg" : "max-w-full"}`}
              style={{ maxWidth: itm.role === "user" ? "70%" : "100%" }}
            > 
              {itm.role === "assistant" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(itm.content, {
                      gfm: true, 
                      breaks: true, 
                    })
                  }}
                />
              ) : (
                itm.content
              )}
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

      </div>
    </section>
  )
}