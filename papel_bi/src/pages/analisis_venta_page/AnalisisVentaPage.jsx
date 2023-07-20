import React, {useEffect, useState} from 'react';
import axios from 'axios'
import styled from "styled-components";
import TableAnalisisVentas from './components/table/TableAnalisisVentas';
import SelectoresAnalisis from './components/selectores_analisis/SelectoresAnalisis';
import { apiUrl } from '../../conf/axiosInstance';


const Contenedor = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    width:100%;
`;

const AnalisisVentaPage = () => {

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
            url: `${apiUrl.url}ventas/analisis_venta_dinamico/`,
            data: parametros
          });
        setData(datos.data.data)
        setTotales(datos.data.totales)
        setLoading(false)
        setParametrosTable(parametros)
        setDimensiones([parametros.subdimension])
    } 

    return (
        <Contenedor>
            <SelectoresAnalisis 
                setParametros={setParametros} 
                parametros={parametros} 
                getData={getData}
                totales ={totales}
            />
            <TableAnalisisVentas 
                datos={data} 
                setData={setData} 
                loading={loading} 
                setLoading={setLoading}
                parametrosTable={parametrosTable} 
                setParametrosTable={setParametrosTable} 
                dimensiones={dimensiones}
                setDimensiones={setDimensiones}
                setTotales= {setTotales}
            />  
        </Contenedor>
    );
}

export default AnalisisVentaPage;
