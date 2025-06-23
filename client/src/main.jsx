import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/wait-times',
    element: <App />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
