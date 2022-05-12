import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'

import useForm from '../../../../hook/useForm';
import { Lugar } from '../../../../redux/interface/evento';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme'
import { ErrorMap } from './interface/interface';
import { schemaEspacio } from './validacion/schemaEspacio';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const EspacioCreate = (props: Props) => {

    const { setstep } = props;
    const evento = useAppSelector((s) => s.evento);
    const dispatch = useAppDispatch();
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const { value, onChange, onChangeSelect, reset } = useForm({
        nombre: "",
        sector: `${evento.lugar[0].nombre},${evento.lugar[0].sector[0].nombre}`,
        descripcion: "",
        capacidad: 0,
        cantidad: 0
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
        schemaEspacio.validate(value).catch((err) => {
            seterrors({
                ...errors,
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const agregarEspacio = () => {
        let lugarSector = value.sector.split(",");
        let lugar = lugarSector[0]; //obtiene el lugar
        let sector = lugarSector[1]; //obtiene el sector
        let payload = { ...value, sector, lugar };
        validarCampos();
        schemaEspacio.validate(value).then(() => {
            if (validarCapacidadSector()) {
                dispatch(actionEvento.addEspacio(payload))
                reset();
            }
        });
    }

    const validarCapacidadSector = (): boolean => {
        let LugarSector = value.sector.split(",");
        let lugarNombre = LugarSector[0];
        let sectorNombre = LugarSector[1]
        let isValidEspacio = true;
        evento.lugar.find((lugar) => {
            if (lugar.nombre === lugarNombre) {
                lugar.sector.find((sector) => {
                    if (sector.nombre === sectorNombre) {
                        let sectorCapacidad = sector.capacidad;
                        sector.espacio.forEach((espacio) => {
                            sectorCapacidad = sectorCapacidad - (espacio.cantidad * espacio.capacidad)
                        });
                        sectorCapacidad = sectorCapacidad - (value.cantidad * value.capacidad);
                        if (sectorCapacidad < 0) {
                            isValidEspacio = false;
                            seterrors({
                                ...errors,
                                name: "espacio",
                                error: `No se puede agregar ese espacio ya , capacidad limite del ${lugar.nombre}/${sector.nombre} es ${sector.capacidad}`,
                            });
                        }
                        return true;//break
                    }
                });
                return true;//break
            }
        });
        return isValidEspacio;
    }

    const eliminar = (lugar: string, sector: string, espacio: string) => {
        dispatch(actionEvento.deleteEspacio({ lugar, sector, espacio }));
    }

    const validarSectorWithEspacio = () => {
        let isValidSectorWithEspacio = true;
        evento.lugar.find((lugar) => {
            lugar.sector.find((sector) => {
                if (sector.espacio.length === 0) {
                    isValidSectorWithEspacio = false;
                    seterrors({
                        ...errors,
                        name: "espacio",
                        error: `debe agregar al menos un espacio a ${lugar.nombre}/${sector.nombre}`,
                    });
                    return true;//break
                }
            });
        });
        return isValidSectorWithEspacio;
    }

    const nextPage = () => {
        if (validarSectorWithEspacio()) {
            setstep((next) => next + 1);
        }
    }

    return (
        <Container style={{ backgroundColor: CARD }}>

            <h5 className='text-muted'>Crear Espacio</h5>

            <Form className='row text-muted'>
                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Nombre</small></Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'ed...'}
                        name={'nombre'}
                        value={value.nombre}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        autoComplete="off"
                    />
                    <Form.Text className="text-danger">{errors.name === "nombre" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Sector</small></Form.Label>
                    <Form.Select
                        name={'sector'}
                        onChange={(e) => onChangeSelect(e as React.FormEvent<HTMLSelectElement>, 'sector')}
                        value={value.sector}
                    >
                        {
                            evento.lugar.map((lugar) => {
                                let html = lugar.sector.map((sector, index) => (
                                    <option key={sector.nombre + index} value={`${lugar.nombre},${sector.nombre}`}>{`${lugar.nombre}/${sector.nombre}`}</option>
                                ));
                                return html;
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className={'col-md-12'}>
                    <Form.Label><small>Descripcion</small></Form.Label>
                    <Form.Control
                        type='text'
                        name='descripcion'
                        value={value.descripcion}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        as="textarea" placeholder="...."
                    />
                    <Form.Text className="text-danger">{errors.name === "descripcion" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Capacidad</small></Form.Label>
                    <Form.Control
                        type={'number'}
                        placeholder={'ed...'}
                        name={'capacidad'}
                        autoComplete="off"
                        value={value.capacidad}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Form.Text className="text-danger">{errors.name === "capacidad" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Cantidad</small></Form.Label>
                    <Form.Control
                        type={'number'}
                        placeholder={'ed...'}
                        name={'cantidad'}
                        autoComplete="off"
                        value={value.cantidad}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Form.Text className="text-danger">{errors.name === "cantidad" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6 my-3'}>
                    <Button onClick={() => agregarEspacio()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>

            </Form>

            <ListSector eliminar={eliminar} lugares={evento.lugar} />

            <p className={'my-4 text-center text-muted'}>
                <small className="text-danger">{errors.name === "espacio" && errors.error}</small>
            </p>

            <Button onClick={() => nextPage()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container >
    )
}


interface EspacioProps {
    lugares: Lugar[];
    eliminar: (lugar: string, sector: string, espacio: string) => void;
}


const ListSector = (props: EspacioProps) => {

    const { lugares, eliminar } = props;

    return (
        <Container>
            <Table striped className={'my-4 border rounded text-muted'}>
                <thead>
                    <tr>
                        <th>sector</th>
                        <th>espacio</th>
                        <th>cantidad</th>
                        <th>capacidad</th>
                        <th>eliminar</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        (lugares.length > 0) &&
                        lugares.map((lugar) => {
                            let data = lugar.sector.map((sector) => {
                                let espacios = sector.espacio.map((espacio, index) => (
                                    <tr key={espacio.nombre + index} >
                                        <td><small>{`${lugar.nombre}/${sector.nombre}`}</small></td>
                                        <td>{espacio.nombre}</td>
                                        <td>{espacio.cantidad}</td>
                                        <td>{espacio.capacidad}</td>
                                        <td>
                                            <button onClick={() => eliminar(lugar.nombre, sector.nombre, espacio.nombre)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                                <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                return espacios;
                            });
                            return data;
                        })
                    }
                </tbody>
            </Table>

        </Container>
    )
}

export default EspacioCreate