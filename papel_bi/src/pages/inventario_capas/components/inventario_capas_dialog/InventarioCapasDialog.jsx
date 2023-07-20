import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import Logo from '../../../../images/logo3.png';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const InventarioCapasDialog = ({open,setOpen,parametrosTable,value}) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    const handleClose = () => {
        setOpen(false);
      };

    const getData = async() =>{

    }

    useEffect(() => {
        if(open){
            console.log('Loading Inventario Capas Dialog')
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
                <CloseIcon sx={{fontSize:25}}/>
                </IconButton>
            </Toolbar>
            </AppBar>
            {value}
            {JSON.stringify(parametrosTable)}
        </Dialog>
    );
}

export default InventarioCapasDialog;
