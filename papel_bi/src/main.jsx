import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider} from 'react-router-dom'
import { router } from './Router'

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ProviderBi from './context/providerBi'



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
