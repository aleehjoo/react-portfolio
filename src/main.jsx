import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SpaceProvider } from './theme/SpaceProvider'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import './index.css'

// SpaceProvider sits outside the router so the chosen space survives
// navigation between the portfolio and the 404.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpaceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SpaceProvider>
  </StrictMode>,
)
