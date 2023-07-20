import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import MainLayout from './layout/MainLayout'
import AnalisisVentaPage from './pages//analisis_venta_page/AnalisisVentaPage'
import HomePage from './pages/home_page/HomePage'
import InventarioCapasPage from './pages/inventario_capas/InventarioCapasPage'
import AnalisisCostoPage from './pages/analsisis_costo/AnalisisCostoPage'

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useTheme } from 'styled-components'
import ProviderBi from '../context/providerBi'
import ProyeccionCosto from './pages/ProyeccionCosto/ProyeccionCosto'
import ProyeccionInventario from './pages/proyeccion_inventario/ProyeccionInventario'






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
  },
  {
    path: "/inventarios_capas",
    element: <MainLayout/>,
    children:[
      { 
        path: "",
        element:<InventarioCapasPage />,
      },
    ]
  },
  {
    path: "/proyeccion_costo",
    element: <MainLayout/>,
    children:[
      { 
        path: "",
        element:<ProyeccionCosto />,
      },
    ]
  },
  {
    path: "/proyeccion_inventario",
    element: <MainLayout/>,
    children:[
      { 
        path: "",
        element:<ProyeccionInventario />,
      },
    ]
  }
])


export const themeOptions = {
  palette: {
    common:{
      arcRed: 'yellow'
    },
   /*
   primary: {
      main: '#8056cb',
    },
    secondary: {
      main: '#f50057',
    }, 
    */
  },
};

const theme = createTheme(themeOptions);



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
       <ThemeProvider theme={theme}> 
          <ProviderBi>
            <RouterProvider router={router} />
          </ProviderBi>
      </ThemeProvider> 
  </React.StrictMode>,
)
