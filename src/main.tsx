import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { SavedGuidesProvider } from './context/SavedGuidesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SavedGuidesProvider>
          <App />
        </SavedGuidesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
