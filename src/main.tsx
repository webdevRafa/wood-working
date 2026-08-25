import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ContentProvider } from './context/ContentContext.tsx'
import { SavedGuidesProvider } from './context/SavedGuidesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <AuthProvider>
          <SavedGuidesProvider>
            <App />
          </SavedGuidesProvider>
        </AuthProvider>
      </ContentProvider>
    </BrowserRouter>
  </StrictMode>,
)
