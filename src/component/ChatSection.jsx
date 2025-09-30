import React from 'react'
import UseChat from '../hooks/UseChat'

export default function ChatSection() {
  const { state } = UseChat();
  console.log(state)
  return (
    <section className='max-w-7xl mx-auto text-gray-50 p-4'>
      <div className='flex flex-col gap-4 max-w-4xl mx-auto'>
        {state.messages.map(itm => (
          <div
          className={`flex ${itm.role === "user" ? "justify-end" : "justify-start"}`} 
          key={itm.content}>
            <div className={`px-4 py-2 rounded-2xl ${itm.role === 'user' ? "bg-zinc-800 shadow-2xl" : ""}`}>
              {itm.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
