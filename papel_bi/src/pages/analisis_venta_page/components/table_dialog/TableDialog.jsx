import React, {useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Logo from '../../../../images/logo3.png';
import axios from 'axios'

import TableDetailVentas from './TableDetailVentas';
import { apiUrl } from '../../../../conf/axiosInstance';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const TableDialog = ({open,setOpen,parametrosTable,value}) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    const handleClose = () => {
        setOpen(false);
      };

    const getData =  async()=>{
        const body = {...parametrosTable,[parametrosTable.subdimension]:value}
        setLoading(true)
        const datos = await axios({
           method: 'post',
           url: `${apiUrl.url}ventas/ventas_dimension/`,
           data: body
         });
       setData(datos.data.data)
       setLoading(false)
       console.log(datos.data.data)
    }

    useEffect(() => {
        if(open){
            console.log('Loading Table Dialog')
            console.log(parametrosTable)
            console.log(value)
            getData()
        }else{
            setData([])
        }
    }, [open]);

    return (
    
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                >
                <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        <img src={Logo} alt="logo" width={"100"} height={"50"}/> 
                    </Button>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"> 
                    </Typography>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon  sx={{fontSize:25}} />
                    </IconButton >
                </Toolbar>
                </AppBar>

                <TableDetailVentas datos={data} loading={loading}/>
                
            </Dialog>
        
            
        
    );
}

export default TableDialog;
