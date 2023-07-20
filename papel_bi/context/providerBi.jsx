import React, { useState } from 'react';
import { ContextBi } from './context'

const ProviderBi = ({children}) => {
    
    const contextIni = {
   
    }
    return (
        <ContextBi.Provider value = {contextIni}>
            {children}
        </ContextBi.Provider>
    );
}

export default ProviderBi;
