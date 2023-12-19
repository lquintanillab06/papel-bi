import React, {useState} from 'react';
import axios from 'axios'
import ProyeccionInventarioTable from './components/ProyeccionInventarioTable';
import SelectoresAnalisis from './components/selectores_analisis/SelectoresAnalisis';
import { apiUrl } from '../../conf/axiosInstance';

import "./ProyeccionInventario.css"

const ProyeccionInventario = () => {
    const [data, setData] = useState([]);

    const [totales, setTotales] = useState({});

    const [loading, setLoading] = useState(false)

    const [acumulado, setAcumulado] = useState(false);

    const [parametros, setParametros] = useState({
        ejercicio: null,
        mes: null,
    
    })

    const [parametrosTable, setParametrosTable] = useState({
        ejercicio: null,
        mes: null,
    
    })

    const getData = async() =>{
        setLoading(true)
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}inventario/proyeccion_inventario/`,
            data: parametros
          });
        setData(datos.data.data)
        setTotales(datos.data.totales)
        setLoading(false)
        setParametrosTable(parametros)
    } 

    const getDataAcumulado = async() =>{
        setLoading(true)
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}inventario/proyeccion_inventario_acumulado/`,
            data: parametros
          });
        setData(datos.data.data)
        setTotales(datos.data.totales)
        setLoading(false)
        setParametrosTable(parametros)
    } 

    



    return (
        <div className='inventario-container'>
            <aside className='aside'>
                <SelectoresAnalisis 
                    setParametros={setParametros} 
                    parametros={parametros} 
                    getData={getData}
                    totales ={totales}
                    getDataAcumulado = {getDataAcumulado}
                    acumulado={acumulado}
                    setAcumulado={setAcumulado}
                />
            </aside>
            <main className='inventario-content'>
                <ProyeccionInventarioTable
                loading={loading} 
                datos={data}
                setData={setData} 
                setLoading={setLoading}
                parametrosTable={parametrosTable} 
                setParametrosTable={setParametrosTable} 
                setTotales= {setTotales} 
                
                />
            </main>

                 
        </div>
    );

}

export default ProyeccionInventario;
