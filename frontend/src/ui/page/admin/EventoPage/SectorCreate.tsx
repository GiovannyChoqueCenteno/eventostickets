import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import useForm from '../../../../hook/useForm';
import { Lugar } from '../../../../redux/interface/evento';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme'
import { ErrorMap } from './interface/interface';
import { schemaSector } from './validacion/schemaSector';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const SectorCreate = (props: Props) => {

    const { setstep } = props;
    const evento = useAppSelector((s) => s.evento);
    const dispatch = useAppDispatch();
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const { value, onChange, onChangeSelect, reset } = useForm({
        nombre: "",
        capacidad: 0,
        lugar: evento.lugar[0].nombre || ''
    });

    const agregar = () => {
        validarCampos();
        schemaSector.validate(value).then(() => {
            if (validarCapacidadLugarSector()) {
                dispatch(actionEvento.addSector(value));
                reset();
            }
        });
    }

    const validarCapacidadLugarSector = (): boolean => {
        let isValidCapacidad = true;
        evento.lugar.find(lugar => {
            if (value.lugar === lugar.nombre) {
                let capacidadLugar = lugar.capacidad;
                lugar.sector.forEach((sector) => {
                    capacidadLugar = capacidadLugar - sector.capacidad;
                })
                capacidadLugar = capacidadLugar - value.capacidad;
                if (capacidadLugar < 0) {
                    isValidCapacidad = false;
                    seterrors({
                        ...errors,
                        name: "sector",
                        error: `No se puede agregar esa capacidad, capacidad limte del lugar ${lugar.nombre} es ${lugar.capacidad}`,
                    });
                    return true;//break
                }
            }
        });
        return isValidCapacidad;
    }

    const Onchange = (e: React.FormEvent<HTMLInputElement>) => {
        validarCampos();
        onChange(e);
    }

    const validarCampos = () => {
        seterrors({
            name: "",
            error: ""
        });
        schemaSector.validate(value).catch((err) => {
            seterrors({
                ...errors,
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const validarLugarWithSector = (): boolean => {
        let isValidLugarWithSector = true;
        evento.lugar.find((lugar) => {
            if (lugar.sector.length === 0) {
                isValidLugarWithSector = false;
                seterrors({
                    ...errors,
                    name: "sector",
                    error: `debe agregar al menos un sector al lugar: ${lugar.nombre}`,
                });
                return true; //break
            }
            return false;
        });
        return isValidLugarWithSector;
    }

    const nextPage = () => {
        if (validarLugarWithSector()) {
            setstep((next) => next + 1);
        }
    };

    const eliminar = (lugar: string, sector: string) => {
        dispatch(actionEvento.deleteSector({ lugar, sector }));
    }

    return (
        <Container style={{ backgroundColor: CARD }}>
            <h5 className='text-muted'>Crear Sector</h5>
            <Form className='row text-muted'>
                <Form.Group className={'col-md-12'}>
                    <Form.Label><small>Nombre del Sector</small></Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'ed...'}
                        name={'nombre'}
                        autoComplete="off"
                        value={value.nombre}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Form.Text className="text-danger">{errors.name === "nombre" && errors.error}</Form.Text>
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
                    <Form.Label><small>Lugares</small></Form.Label>
                    <Form.Select
                        name={'lugar'}
                        onChange={(e) => onChangeSelect(e as React.FormEvent<HTMLSelectElement>, 'lugar')}
                        value={value.lugar}
                    >
                        {
                            evento.lugar.map((lugar) => (
                                <option key={lugar.nombre} value={lugar.nombre}>{lugar.nombre}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className={'col-md-6 my-3'}>
                    <Button onClick={() => agregar()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>
            </Form>

            <ListSector eliminar={eliminar} lugares={evento.lugar} />

            <p className={'my-4 text-center text-muted'}>
                <small className="text-danger">{errors.name === "sector" && errors.error}</small>
            </p>

            <Button onClick={() => nextPage()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container>
    )
}

interface SectorProps {
    lugares: Lugar[];
    eliminar: (lugar: string, sector: string) => void;
}

const ListSector = (props: SectorProps) => {

    const { lugares, eliminar } = props;

    return (
        <Container>
            <Table striped className={'my-4 border rounded text-muted'}>
                <thead>
                    <tr>
                        <th>lugar</th>
                        <th>sector</th>
                        <th>capacidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        (lugares.length > 0) &&
                        lugares.map((lugar, index) => {
                            let lugarNombre = lugar.nombre;
                            let data = lugar.sector.map((sector, index) => (
                                <tr key={sector.nombre + index} >
                                    <td>{lugarNombre}</td>
                                    <td>{sector.nombre}</td>
                                    <td>{sector.capacidad}</td>
                                    <td>
                                        <button onClick={() => eliminar(lugarNombre, sector.nombre)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                            <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                        </button>
                                    </td>
                                </tr>
                            ));
                            return data;
                        })
                    }
                </tbody>
            </Table>

        </Container>
    )
}


export default SectorCreate