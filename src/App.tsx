import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter basename="/HimnarioVidaCristianaWeb">
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App