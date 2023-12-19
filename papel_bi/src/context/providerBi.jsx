import React, { useState } from 'react';
import { ContextBi } from './context'
import { useTheme } from '@emotion/react';

const ProviderBi = ({children}) => {
    
    const contextIni = {
   
    }

    const theme2 = useTheme()

    console.log(theme2)
    return (
        <ContextBi.Provider value = {contextIni}>
            {children}
        </ContextBi.Provider>
    );
}

export default ProviderBi;
