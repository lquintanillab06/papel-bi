import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ProyeccionCostoTable from './components/ProyeccionCostoTable';
import SelectoresAnalisis from './components/selectores_analisis/SelectoresAnalisis';
import { apiUrl } from '../../conf/axiosInstance';

import "./ProyeccionCosto.css"
const ProyeccionCosto = () => {
    const [data, setData] = useState([]);

    const [totales, setTotales] = useState({});

    const [loading, setLoading] = useState(false)

    const [dimensiones, setDimensiones] = useState();

    const [acumulado, setAcumulado] = useState(false);



    const [parametros, setParametros] = useState({
        ejercicio: null,
        mes: null,
        subdimension: null,
        nacional: null,
        origen: null
    })

    const [parametrosTable, setParametrosTable] = useState({
        ejercicio: null,
        mes: null,
        subdimension: null,
        nacional: null,
        origen: null
    })

    const getData = async() =>{
        setLoading(true)
        setDimensiones([])
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}costo/proyeccion_costo/`,
            data: parametros
          });

        console.log(datos.data.data)
        setData(datos.data.data)
        setTotales(datos.data.totales)
        setLoading(false)
        setParametrosTable(parametros)
        setDimensiones([parametros.subdimension])
    } 

    const getDataAcumulado = async() =>{
        setLoading(true)
        setDimensiones([])
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}costo/proyeccion_costo_anual/`,
            data: parametros
          });
        console.log(datos.data.data)
        setData(datos.data.data)
        setTotales(datos.data.totales)
        setLoading(false)
        setParametrosTable(parametros)
        setDimensiones([parametros.subdimension])
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
                <ProyeccionCostoTable
                loading={loading} 
                datos={data}
                setData={setData} 
                setLoading={setLoading}
                parametrosTable={parametrosTable} 
                setParametrosTable={setParametrosTable} 
                dimensiones={dimensiones}
                setDimensiones={setDimensiones}
                setTotales= {setTotales} 
                acumulado={acumulado}
                setAcumulado={setAcumulado}
                />
            </main>

                 
        </div>
    );
}

export default ProyeccionCosto;
