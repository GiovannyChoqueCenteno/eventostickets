import React, { useEffect } from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import useForm from '../../../../hook/useForm';
import useSector from '../../../../hook/useSector';
import { actionCart } from '../../../../redux/slice/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import MapLocation from '../../../component/MapLocation';
import { CARD, BTN_RED } from '../../../const/theme';

interface locationParam {
    lugarId: number;
    lng: string;
    lat: string;
}

const BuyTicketPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const usuario = useAppSelector((s) => s.usuario);
    const dispatch = useAppDispatch();
    const params = location.state as locationParam;
    const { sectorEspacio } = useSector({ lugarId: Number(params.lugarId) });

    const { value, onChange, setData } = useForm({
        sector: "",
        espacio: "",
        sectorName: "",
        espacioName: "",
        cantidad: "0",
    });

    const OnSectorEspacio = (e: React.FormEvent<HTMLSelectElement>) => {
        let idSector = e.currentTarget.value;
        sectorEspacio.find((sector) => {
            if (sector.id.toString() === idSector) {
                setData({
                    sector: idSector,
                    sectorName: sector.nombre,
                    espacio: sector.espacio[0].id.toString(),
                    espacioName: sector.espacio[0].nombre,
                })
                return true;
            }
        })
    }
    const OnEspacio = (e: React.FormEvent<HTMLSelectElement>) => {
        let espacio = e.currentTarget.value.split(",");
        setData({
            espacio: espacio[0],
            espacioName: espacio[1]
        })
    }

    useEffect(() => {
        if (sectorEspacio.length > 0)
            setData({
                sector: sectorEspacio[0].id.toString(),
                sectorName: sectorEspacio[0].nombre,
                espacio: sectorEspacio[0].espacio[0].id.toString(),
                espacioName: sectorEspacio[0].espacio[0].nombre
            });
    }, [sectorEspacio]);

    const OnclickPay = () => {
        const payload = {
            sector: value.sectorName,
            espacio: value.espacioName,
            cantidad: value.cantidad,
            espacioId: value.espacio
        }
        dispatch(actionCart.addSectorEspacio(payload));
        navigate('/pay');
    }

    return (
        <Container className={'mt-4 text-dark'}>
            <h4 className=''>Eventos</h4>
            <hr />
            <Container className={'rounded shadow p-4 mb-4'} style={{ backgroundColor: CARD }}>
                <h4>Selecciona el espacio a comprar</h4>
                <Form className={'row'}>
                    <Form.Group className={'col-md-6 my-2'}>
                        <label className="form-label">Sectores</label>
                        <Form.Select name={'sector'} onChange={(e) => OnSectorEspacio(e)} >
                            {
                                sectorEspacio.map((sector) => (
                                    <option key={sector.id} value={sector.id}>{sector.nombre}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'col-md-6 my-2'}>
                        <label className="form-label">Espacios</label>
                        <Form.Select name={"espacio"} onChange={(e: React.FormEvent<HTMLSelectElement>) => OnEspacio(e)}>
                            {
                                sectorEspacio.map((sector) => {
                                    if (sector.id.toString() === value.sector) {
                                        return sector.espacio.map((espacio) => (
                                            <option key={espacio.id} value={`${espacio.id},${espacio.nombre}`}>{espacio.nombre}</option>
                                        ))
                                    }
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={'col-md-6 my-2'}>
                        <label className="form-label">Cantidad</label>
                        <Form.Control type={'number'} name={'cantidad'} placeholder={'cantidad'} onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)} />
                    </Form.Group>
                    <Form.Group className={'col-md-12 my-2'}>
                        {
                            sectorEspacio.map((sector) => {
                                if (sector.id.toString() === value.sector) {
                                    return sector.espacio.map((esp) => {
                                        if (esp.id.toString() === value.espacio) {
                                            return (
                                                <React.Fragment key={esp.id}>
                                                    <div className={'p-2'}>
                                                        <h6 className={'my-2'}>Precio {esp.nombre} :{esp.precio}</h6>
                                                        <h6 className={'my-2'}>Capacidad {esp.capacidad}</h6>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                    });
                                }
                            })
                        }
                    </Form.Group>
                </Form>

                <p>
                    <label className="form-label">Ubicacion de Lugar</label>
                </p>

                <MapLocation
                    lat={params.lat}
                    lng={params.lng}
                    popup={"Uagrm direccion"}
                />

                <Button onClick={OnclickPay} variant={''} className={'text-white my-3'} style={{ backgroundColor: BTN_RED }}>
                    Realizar Pago
                </Button>

            </Container>
        </Container>
    )
}

export default BuyTicketPage