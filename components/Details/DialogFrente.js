import React, { forwardRef, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import apiDeputados from '../../services/conectaAPI';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogFrente = ({ dataId = 0, closeShow }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])


    useEffect(() => {
        if (dataId > 0) {
            getData(dataId)
        }
    }, [dataId])


    async function getData(frenteId) {
        const resultConsult = await apiDeputados.get(`/frentes/${frenteId}`)
        const resultDeputados = resultConsult.data.dados

        setData(resultDeputados)
        setOpen(true)
    }



    const handleClose = () => {
        setOpen(false)
        closeShow(false)
    };
    return (
        <div>
            <Dialog
                open={open}
                scroll={"paper"}

                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{data.titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {data.situacao}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button> <a href={data.urlDocumento} target="_onBlanck" className="text-decoration-none">Abrir documento</a></Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogFrente