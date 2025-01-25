import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { WorkoutContextProvider } from './context/WorkoutContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </StrictMode>,
)
