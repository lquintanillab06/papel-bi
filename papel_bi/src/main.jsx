import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import MainLayout from './layout/MainLayout'
import AnalisisVentaPage from './pages//analisis_venta_page/AnalisisVentaPage'
import HomePage from './pages/home_page/HomePage'



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      { 
        path: "",
        element:<HomePage />,
      },
    ]
  },
  {
    path: "/analisis_venta",
    element: <MainLayout/>,
    children:[
      { 
        path: "",
        element:<AnalisisVentaPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
