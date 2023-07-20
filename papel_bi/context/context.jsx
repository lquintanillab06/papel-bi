import { createContext } from "react";


const contextBi = {
    sucursal: "Papel s.a.",
    periodo:{},
    sucursales:[],
    mes : 0
}


export const ContextBi = createContext(contextBi)