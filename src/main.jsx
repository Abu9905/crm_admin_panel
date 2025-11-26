import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { AuthProvider } from './contexts/AuthContext'
import { PanelAccessProvider } from './contexts/PanelAccessContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PanelAccessProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </PanelAccessProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
