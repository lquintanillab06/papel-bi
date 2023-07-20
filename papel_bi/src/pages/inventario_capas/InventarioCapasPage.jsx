import React, {useState, useEffect} from 'react';
import axios from 'axios'
import InventarioCapasTable from './components/InventarioCapasTable';
import SelectoresAnalisis from '../analisis_venta_page/components/selectores_analisis/SelectoresAnalisis';
import { apiUrl } from '../../conf/axiosInstance';

import "./InventarioCapas.css"

const InventarioCapasPage = () => {

    const [data, setData] = useState([]);

    const [totales, setTotales] = useState({});

    const [loading, setLoading] = useState(false)

    const [dimensiones, setDimensiones] = useState();



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
            url: `${apiUrl.url}capas/inventario_capas/`,
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
                />
            </aside>
            <main className='inventario-content'>
                <InventarioCapasTable 
                loading={loading} 
                datos={data}
                setData={setData} 
                setLoading={setLoading}
                parametrosTable={parametrosTable} 
                setParametrosTable={setParametrosTable} 
                dimensiones={dimensiones}
                setDimensiones={setDimensiones}
                setTotales= {setTotales} 
                />
            </main>

                 
        </div>
    );
}

export default InventarioCapasPage;
