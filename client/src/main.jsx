import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import App from './App.jsx'
import ParkDetails from './pages/ParkDetails.jsx'
import Header from './components/Header.jsx'

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [ 
      {
        index: true,
        element: <App />
      },
      {
        path: "/park/:id",
        element: <ParkDetails />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
