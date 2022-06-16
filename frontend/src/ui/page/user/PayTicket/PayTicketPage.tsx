import React, { useState } from 'react'
import { Container, Form, Col, Row, Image, Button, Alert } from 'react-bootstrap'
import { BTN_PRIMARY, CARD } from '../../../const/theme'
import logoLibelula from '../../../assets/image/logoLibelula.png';
import logoPaypal from '../../../assets/image/logoPaypal.png';
import logoStripe from '../../../assets/image/logoStripe.png';
import useForm from '../../../../hook/useForm';
import { useAppSelector } from '../../../../redux/store/config';
import useEspacio from '../../../../hook/useEspacio';
import { ErrorMap } from '../../admin/EventoPage/interface/interface';
import { schemaPay } from './validation/schemaPay';
import apiBackend from '../../../../api/apiBackend';
import { Factura } from '../../../../api/model/Factura';
import { Detalle } from '../../../../api/model/Detalle';

const PayTicketPage = () => {

    const usuario = useAppSelector((s) => s.usuario);
    const cart = useAppSelector((s) => s.cart);
    const { espacio } = useEspacio({ espacioId: cart.espacioId });
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const { value, onChange,reset } = useForm({
        tipoPago: "stripe",
        nombre: usuario.nombre,
        card: "",
        cvc: "",
        fecha: "",
    });

    const Onchange = (e: React.FormEvent<HTMLInputElement>) => {
        validarCampos();
        onChange(e);
    }

    const validarCampos = () => {
        seterrors({
            name: "",
            error: ""
        });
        schemaPay.validate(value).catch((err) => {
            seterrors({
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const OnPay = (e: React.SyntheticEvent) => {
        e.preventDefault();
        validarCampos();
        schemaPay.validate(value).then(async () => {
            let factura: Factura = await createFactura(espacio.precio * cart.cantidad, usuario.id);
            let detalle: Detalle = await createDetalle(espacio.precio, cart.cantidad, factura.id, espacio.id);
            for (let index = 0; index < cart.cantidad; index++) {
                await createEntrada(detalle.id, cart.espacio, cart.sector, cart.evento);
            }
            reset();
            alert("Se realizo la compra correctamente");
        });
    }

    const createFactura = async (total: number, usuarioId: number) => {
        let data = {
            total,
            usuarioId,
        }
        try {
            let response = await apiBackend.post(`/factura`, data);
            return response.data;
        } catch (error) {
            console.log("error createFactura : " + error);
        }
    }
    const createDetalle = async (costo: number, cantidad: number, facturaId: number, espacioId: number) => {
        const data = {
            costo,
            cantidad: Number(cantidad),
            espacioId,
            facturaId
        }
        try {
            let response = await apiBackend.post(`/detalleFactura`, data);
            return response.data;
        } catch (error) {
            console.log("error createDetalle : " + error);
        }
    }

    const createEntrada = async (detalleId: number, espacio: string, sector: string, evento: string) => {
        const data = {
            detalleId,
            espacio,
            sector,
            evento,
        }
        try {
            await apiBackend.post(`/entrada`, data);
        } catch (error) {
            console.log("error createEntrada : " + error);
        }
    }


    return (
        <Container className={'mt-4 text-dark p-4'}>
            <h4 className=''>Eventos</h4>
            <hr />
            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <h4>Realizar Pago</h4>
                <p>Event App ofrece los siguientes metodos de pagos </p>
                <hr />
                <Form className={'p-3'}>

                    <Form.Group as={Row} className="mb-3 border rounded p-2 shadow">
                        <Col md={10}>
                            <Container>
                                <Row>
                                    <Col md={2}>
                                        <Image style={{ width: 100 }} src={logoStripe} alt={'logoStripe'} />
                                    </Col>
                                    <Col md={10}>
                                        <p style={{ textAlign: "justify" }}>
                                            Millones de empresas de todos los tamaños, desde startups hasta grandes empresas, usan el software y las API de Stripe para aceptar pagos, enviar transferencias y gestionar sus actividades comerciales en Internet.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={2}>
                            <Form.Check
                                type="radio"
                                name="tipoPago"
                                value={"stripe"}
                                checked={value.tipoPago === "stripe"}
                                onChange={(e) => onChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 border rounded p-2 shadow">
                        <Col md={10}>
                            <Container>
                                <Row>
                                    <Col md={2}>
                                        <Image style={{ width: 100 }} src={logoPaypal} alt={'logoPaypal'} />
                                    </Col>
                                    <Col md={10}>
                                        <p style={{ textAlign: "justify" }}>
                                            PayPal es un servicio global que te permite enviar pagos a la cuenta del vendedor con tu tarjeta de crédito, pero sin compartir tu información financiera.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={2}>
                            <Form.Check
                                type="radio"
                                name="tipoPago"
                                value={"paypal"}
                                checked={value.tipoPago === "paypal"}
                                onChange={(e) => onChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 border rounded p-2 shadow">
                        <Col md={10}>
                            <Container>
                                <Row>
                                    <Col md={2}>
                                        <Image style={{ width: 100 }} src={logoLibelula} alt={'logoLibelula'} />
                                    </Col>
                                    <Col md={10}>
                                        <p style={{ textAlign: "justify" }}>
                                            Libélula es la única pasarela de pagos en Bolivia con visión al usuario contando actualmente con cinco canales de pago y próximamente ampliaremos nuestro servicios con cuatro canales revolucionarios adicionales para que la experiencia de nuestros usuario sea aún mejor.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={2}>
                            <Form.Check
                                type="radio"
                                name="tipoPago"
                                value={"libelula"}
                                checked={value.tipoPago === "libelula"}
                                onChange={(e) => onChange(e)}
                            />
                        </Col>
                    </Form.Group>

                </Form>

                <Container className={"bg-white shadow p-4 mb-4 rounded"}>
                    <h4>Detalle de la compra</h4>
                    <hr />
                    <Row>
                        <Col md={6}>
                            <small>Sector</small>
                        </Col>
                        <Col md={6}>
                            <small>{cart.sector}</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <small>Espacio</small>
                        </Col>
                        <Col md={6}>
                            <small>{cart.espacio}</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <small>Capacidad</small>
                        </Col>
                        <Col md={6}>
                            <small>{espacio?.capacidad}</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <small>Cantidad</small>
                        </Col>
                        <Col md={6}>
                            <small>{cart.cantidad}</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <small>Precio</small>
                        </Col>
                        <Col md={6}>
                            <small>{espacio.precio}</small>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={6}>
                            <small>Total</small>
                        </Col>
                        <Col md={6}>
                            <small>{espacio.precio * cart.cantidad}</small>
                        </Col>
                    </Row>
                </Container>

                <Form
                    onSubmit={OnPay}
                    className={'p-3 mb-2 mx-auto rounded border bg-white shadow'}
                    style={{ width: 500 }}
                >

                    <Container className={'text-center'}>
                        {
                            value.tipoPago === "stripe" && <Image style={{ width: 100 }} src={logoStripe} alt={'logoStripe'} />
                        }
                        {
                            value.tipoPago === "paypal" && <Image style={{ width: 100 }} src={logoPaypal} alt={'logoPaypal'} />
                        }
                        {
                            value.tipoPago === "libelula" && <Image style={{ width: 100 }} src={logoLibelula} alt={'logoLibelula'} />
                        }
                    </Container>

                    <Form.Group className={'my-3'} as={Row}>
                        <Form.Label>Nombre</Form.Label>
                        <Col md={12}>
                            <Form.Control
                                type={'text'}
                                name={'nombre'}
                                placeholder={'Nombre'}
                                value={value.nombre}
                                onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                            />
                            <Form.Text className="text-danger">{errors.name === "nombre" && errors.error}</Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group className={'my-3'} as={Row}>
                        <Form.Label>Numero de la Targeta</Form.Label>
                        <Col md={12}>
                            <Form.Control
                                type={'text'}
                                name={'card'}
                                value={value.card}
                                placeholder={'0000 0000 0000 0000'}
                                onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                            />
                            <Form.Text className="text-danger">{errors.name === "card" && errors.error}</Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group className={'my-3'} as={Row}>
                        <Col md={6}>
                            <Form.Label>CVC</Form.Label>
                            <Form.Control
                                type={'text'}
                                name={'cvc'}
                                value={value.cvc}
                                placeholder={'CVC'}
                                onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                            />
                            <Form.Text className="text-danger">{errors.name === "cvc" && errors.error}</Form.Text>
                        </Col>

                        <Col md={6}>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type={'text'}
                                name={'fecha'}
                                value={value.fecha}
                                placeholder={'MM/AA'}
                                onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                            />
                            <Form.Text className="text-danger">{errors.name === "fecha" && errors.error}</Form.Text>
                        </Col>

                    </Form.Group>

                    <Form.Group className={'mt-4'} as={Row}>
                        <Col md={12}>
                            <Button
                                type={"submit"}
                                className={'w-100 text-white'}
                                style={{ backgroundColor: BTN_PRIMARY }} variant={''}>
                                Completar el Pago
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>

            </Container>
        </Container >
    )
}

export default PayTicketPage