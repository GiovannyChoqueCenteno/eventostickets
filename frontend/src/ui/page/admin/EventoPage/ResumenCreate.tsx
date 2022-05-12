import React from 'react'
import { Button, Container } from 'react-bootstrap'

import { BTN_RED, CARD, BTN_PRIMARY } from '../../../const/theme'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { useNavigate } from 'react-router-dom';
import { eventoCreate } from '../../../../redux/middleware/evento';

const ResumenCreate = () => {
    const evento = useAppSelector((s) => s.evento);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const create = () => {
        const args = {
            titulo: evento.nombre,
            descripcion: evento.descripcion,
            categoriaId: evento.categoria,
            estadoId: 2
        };
        dispatch(eventoCreate(args));
        navigate('/main/admin');
    }

    const cancel = () => {
        dispatch(actionEvento.clearState());
        navigate('/main/admin');
    }

    return (
        <Container style={{ backgroundColor: CARD }}>
            <h5 className={'text-muted'}>Esta seguro de crear el evento</h5>
            {/* <h5 className={'text-muted my-4'}>creando...</h5> */}
            <Button onClick={create} variant={""} className={'text-white mx-2'} style={{ backgroundColor: BTN_PRIMARY }} >Crear</Button>
            <Button onClick={cancel} variant={""} className={'text-white mx-2'} style={{ backgroundColor: BTN_RED }}>Cancelar</Button>
        </Container>
    )
}

export default ResumenCreate