import React, {useState, useEffect} from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TextField from '@mui/material/TextField';
import './PeriodoDatePicker.css'


const PeriodoDatepicker = ({periodo, setPeriodo}) => {  
    const [showSelector, setShowSelector] = useState(false);

    const handleClickLabel = () =>{
        setShowSelector(!showSelector)
    }
    const handleSelectorChange = (e) =>{
       if( e.target.value){
            setPeriodo({
                ...periodo,
                [e.target.name]: e.target.value
            })
       }
    }

    const changePeriodo = () =>{
        localStorage.setItem("periodo", JSON.stringify(periodo))
        setShowSelector(false)
    }

    const closeSelector = () =>{
        setShowSelector(false)
    }


    useEffect(() => {
        const periodoStorage = JSON.parse(localStorage.getItem('periodo'))
        if(periodoStorage){
            setPeriodo({
                fecha_inicial: periodoStorage.fecha_inicial,
                fecha_final: periodoStorage.fecha_final
            })
        }else{
            const hoy =  new Date();
            const hoy2 = new Date();
            const antes = new Date(hoy2.setDate(hoy2.getDate() -7))
            const mañana = new Date(hoy.setDate(hoy.getDate() + 1))
            const periodoInicial = {
                fecha_inicial: antes.toISOString().slice(0, 10),
                fecha_final: mañana.toISOString().slice(0, 10)
            }  
            setPeriodo(periodoInicial)
        }
    }, []);
  
    return (
        <div className='datePicker__container'>
                <div className='datePicker__label' onClick={handleClickLabel}> Periodo del {periodo.fecha_inicial} al {periodo.fecha_final} <CalendarTodayIcon />  </div>
                {showSelector ? <div className='datePicker__selector'>
                    <div className="selector__header">
                        <p> Seleccione un periodo:</p>
                    </div>
                    <div className="selector__body">
                    <input type="date" id="fecha_inicial" name="fecha_inicial" onChange = {handleSelectorChange} value={periodo.fecha_inicial}  className="datepicker__input"/>
                    <input type="date" id="fecha_final" name ="fecha_final" onChange = {handleSelectorChange} value={periodo.fecha_final}  className="datepicker__input"/>
        
                    </div>
                    <div className="selector__actions">
                        <button onClick={changePeriodo} className='selector__actions-button'> Aceptar </button>
                        <button onClick={closeSelector} className='selector__actions-button'> Cancelar </button>
                    </div>
                </div> : null}
        </div>
    );
}

export default PeriodoDatepicker;
