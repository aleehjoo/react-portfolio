import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpaceProvider } from './theme/SpaceProvider'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpaceProvider>
      <App />
    </SpaceProvider>
  </StrictMode>,
)
