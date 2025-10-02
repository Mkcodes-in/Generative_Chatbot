import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import ChatProvider from './context/ChatContext.jsx'
import AiLoaderProvider from './context/AiLoader.jsx'

createRoot(document.getElementById('root')).render(
  <AiLoaderProvider>
    <ChatProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChatProvider>
  </AiLoaderProvider>,
)
