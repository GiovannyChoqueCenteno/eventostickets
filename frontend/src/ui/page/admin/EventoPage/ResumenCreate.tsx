import React from 'react'
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap'
import { BTN_PRIMARY, CARD } from '../../../const/theme'
import { useNavigate } from 'react-router-dom';
import globos from '../../../assets/image/balloon.png';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { useAppDispatch } from '../../../../redux/store/config';


const ResumenCreate = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const clearState = () => {
        dispatch(actionEvento.clear());
        navigate('/main/admin', { replace: true });
    }

    return (
        <Container style={{ backgroundColor: CARD }}>
            <Row>
                <Col md={10} className={'mx-auto'}>
                    <Card className={'border-0'}>
                        <Card.Body style={{ backgroundColor: CARD }} className={'text-center'}>
                            <h5 className={'text-center'}>Congratulations</h5>
                            <Image height={100} src={globos} alt={'imagen'} />
                            <p>Se creo el evento con exito !!!</p>
                            <Button onClick={() => clearState()} className={'text-white'} variant={""} style={{ backgroundColor: BTN_PRIMARY }} >Ir a listado Evento</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ResumenCreate