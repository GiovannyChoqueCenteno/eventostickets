import React from 'react'
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { Evento } from '../../../../api/model/Evento'
import useFoto from '../../../../hook/useFoto'
import useLugar from '../../../../hook/useLugar'
import { BTN_RED, CARD } from '../../../const/theme'
import { URL } from '../../../const/url'
import moment from 'moment'
import { useAppDispatch } from '../../../../redux/store/config'
import { actionCart } from '../../../../redux/slice/cartSlice'

const DetailEventPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const evento = location.state as Evento;
    const { fotos } = useFoto({ eventId: evento.id });
    const { LugarHorario } = useLugar({ eventId: evento.id });

    if (evento === null) {
        return (
            <Container className={'mt-4 text-dark'}>
                <h4 className=''>Eventos</h4>
                <hr />
                <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                    <p className={'text-center'}><small>Ruta no valida</small></p>
                </Container>
            </Container>
        )
    }

    const saveStore = (lugar: string, lugarId: number, lng: string, lat: string, fecha: string) => {
        dispatch(actionCart.addNameEvent({ evento: evento.titulo }));
        dispatch(actionCart.addLugarHorario({ lugar, fecha }));
        navigate('/buy', {
            state: { lugarId, lng, lat }
        })
    }

    return (
        <Container className={'mt-4 text-dark'}>
            <h4 className=''>Eventos</h4>
            <hr />
            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <Container>
                    <Row style={{ height: 300 }}>
                        <Col md={6} className={''}>
                            <Carousel fade>
                                {
                                    fotos.map((f) => (
                                        <Carousel.Item key={f.id} interval={2000}>
                                            <img
                                                style={{ height: 300, width: "100%", objectFit: "cover" }}
                                                className="d-block w-100"
                                                src={`${URL.baseUrl}/foto/image/${f.fileName}`}
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                Imagenes del Lugar
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </Col>
                        <Col md={6} className={''}>
                            <Container className={'p-3'}>
                                <h2>{evento.titulo}</h2>
                                <p style={{ textAlign: 'justify' }}>
                                    {evento.descripcion}
                                </p>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <Container className={'mt-2'}>
                    <h4>Horarios Diponibles</h4>
                    <hr />
                    <Row>
                        {
                            LugarHorario.map((lugar) => (
                                lugar.horario.map((horario) => (
                                    <React.Fragment key={horario.id}>
                                        <Col className={'my-1'} md={5}>
                                            <small>{lugar.nombre}</small>
                                        </Col>
                                        <Col className={'my-1'} md={5}>
                                            <small>{moment(horario.fecha).format('lll')}</small>
                                        </Col>
                                        <Col className={'my-1'} md={2}>
                                            <Button onClick={(e) => saveStore(lugar.nombre, lugar.id, lugar.longitud, lugar.latitud, horario.fecha)} className={'w-100 text-white'} variant={''} style={{ backgroundColor: BTN_RED }}>Comprar</Button>
                                        </Col>
                                    </React.Fragment>
                                ))
                            ))
                        }
                    </Row>

                </Container>

            </Container>
        </Container>
    )
}

export default DetailEventPage