import {createBrowserRouter} from 'react-router-dom'


import MainLayout from './layout/MainLayout'
import AnalisisVentaPage from './pages//analisis_venta_page/AnalisisVentaPage'
import HomePage from './pages/home_page/HomePage'
import InventarioCapasPage from './pages/inventario_capas/InventarioCapasPage'

import ProyeccionCosto from './pages/ProyeccionCosto/ProyeccionCosto'
import ProyeccionInventario from './pages/proyeccion_inventario/ProyeccionInventario'
import DashboardPage from './pages/dashboard/DashboardPage'
import AnalisisVentasDashboard from './pages/dashboard/components/AnalisisVentasDashboard'
import AnalisisClientesDashboard from './pages/dashboard/components/AnalisisClientesDashboard'
import Comparativo from './pages/comparativo/Comparativo'



export const router = createBrowserRouter([
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
    },
    {
      path: "/comparativo",
      element: <MainLayout/>,
      children:[
        { 
          path: "",
          element:<Comparativo />,
        },
      ]
    },
    {
      path: "/dashboard",
      element: <MainLayout/>,
      children:[
        { 
          path: "",
          element:<DashboardPage />,
          children:[
           {
           index:true,
            element: <AnalisisVentasDashboard/>
           },
           {
            path:"AC",
            element: <AnalisisClientesDashboard/>
           },
          ]
        },
      ]
    }
  ])