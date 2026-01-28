import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import ChatProvider from './context/ChatContext.jsx'
import AiLoaderProvider from './context/AiLoader.jsx'
import PdfProvider from './context/Pdf.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserSessionProvider } from './context/UserSession.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserSessionProvider>
      <PdfProvider>
        <AiLoaderProvider>
          <ChatProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ChatProvider>
        </AiLoaderProvider>
      </PdfProvider>
    </UserSessionProvider>
  </BrowserRouter>,
)
