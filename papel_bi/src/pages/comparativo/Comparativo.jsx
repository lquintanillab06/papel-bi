import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios'
import styled from "styled-components";
import SelectoresAnalisis from './components/selectores_analisis/SelectoresAnalisis'

import { apiUrl } from '../../conf/axiosInstance';
import TableComparativo from './components/table/TableComparativo';



const Contenedor = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    width:100%;
`;

const Comparativo = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false)

    const [parametros, setParametros] = useState({
        dimension: null,
        ejercicio1: null,
        mes_ini1: null,
        mes_fin1: null,
        ejercicio2: null,
        mes_ini2: null,
        mes_fin2: null,
    })

    const [parametrosTable, setParametrosTable] = useState({
        dimension: null,
        ejercicio1: null,
        mes_ini1: null,
        mes_fin1: null,
        ejercicio2: null,
        mes_ini2: null,
        mes_fin2: null,
      
    })

    const getData = async() =>{
        setLoading(true)
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}comparativo/comparativo_ventas/`,
            data: parametros
          });
        setData(datos.data.data)
        setLoading(false)
        setParametrosTable(parametros)
    } 
    
    return (
        <Contenedor>
            <SelectoresAnalisis 
                setParametros={setParametros} 
                parametros={parametros} 
                getData={getData}
           
            />
           <TableComparativo datos={data} loading={loading} parametrosTable={parametrosTable}/>
        </Contenedor>
    );
}

export default Comparativo;
