import React, { useEffect, useState, useRef,useMemo } from 'react';
import axios from 'axios'



import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import { apiUrl } from '../../conf/axiosInstance';

import './BuscadorProductoDebounce.css'

const BuscadorProductoDebounce = ({setProducto}) => {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    
    const search = useMemo(
        () =>
          debounce((newInputValue) => {
            setInputValue(newInputValue)
            getData(newInputValue)
          }, 500),
        [],
      );

    const getData = async(input) =>{
        const parametros = {
            producto: input
        }
         const datos = await axios({
            method: 'get',
            url: `${apiUrl.url}buscar_producto/`,
            params: parametros
          });
        setOptions(datos.data)     
    }

    return (
      <Autocomplete
          disablePortal
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : `${option.clave} - ${option.descripcion}`
          }
          id="buscador_debounce"
          options={options}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Producto" variant="standard"  fullWidth/>}
          onInputChange={(event, newInputValue) => {
            search(newInputValue)
          }}
          noOptionsText="No hay información"
          value={ inputValue}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          onChange={(event, newValue) => {
            setProducto(newValue)
          }}
      />
    );
}

export default BuscadorProductoDebounce;
