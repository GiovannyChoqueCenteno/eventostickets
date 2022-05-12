import React, { Dispatch, SetStateAction, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Form, Table } from 'react-bootstrap'

import useForm from '../../../../hook/useForm';
import { Lugar } from '../../../../redux/interface/evento';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config'
import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme';
import { ErrorMap } from './interface/interface';
import { schemaHorario } from './validacion/schemaHorario';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const HorarioCreate = (props: Props) => {

    const { setstep } = props;
    const evento = useAppSelector((s) => s.evento);
    const dispatch = useAppDispatch();
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);

    const { value, onChange, onChangeSelect, reset } = useForm({
        lugar: evento.lugar[0].nombre || '',
        fecha: "",
        hora: "",
        duracion: 0
    });

    const Onchange = (e: React.FormEvent<HTMLInputElement>) => {
        validarCampos();
        onChange(e);
    }

    const agregarHorario = () => {
        validarCampos();
        schemaHorario.validate(value).then(() => {
            dispatch(actionEvento.addHorario(value))
            reset();
        });
    }

    const validarCampos = () => {
        seterrors({
            name: "",
            error: ""
        });
        schemaHorario.validate(value).catch((err) => {
            seterrors({
                ...errors,
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const validarLugarWithHorario = (): boolean => {
        let isValidLugarWithHorario = true;
        evento.lugar.find((lugar) => {
            if (lugar.horario.length === 0) {
                isValidLugarWithHorario = false;
                seterrors({
                    ...errors,
                    name: "horario",
                    error: `debe agregar al menos un horario al lugar: ${lugar.nombre}`,
                });
                return true; //break
            }
            return false;
        });
        return isValidLugarWithHorario;
    }

    const nextPage = () => {
        if (validarLugarWithHorario()) {
            setstep((next) => next + 1);
        }
    }

    const eliminar = (lugar: string, fecha: string, hora: string) => {
        dispatch(actionEvento.deleteHorario({ lugar, fecha, hora }));
    }

    return (
        <Container style={{ backgroundColor: CARD }}>
            <h5 className='text-muted'>Crear Horario</h5>
            <Form className='row text-muted'>
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

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Fecha</small></Form.Label>
                    <Form.Control
                        type={'date'}
                        name={'fecha'}
                        value={value.fecha}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        autoComplete="off"
                    />
                    <Form.Text className="text-danger">{errors.name === "fecha" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Hora</small></Form.Label>
                    <Form.Control
                        type={'time'}
                        name={'hora'}
                        value={value.hora}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        autoComplete="off"
                    />
                    <Form.Text className="text-danger">{errors.name === "hora" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Duracion</small></Form.Label>
                    <Form.Control
                        type={'number'}
                        name={'duracion'}
                        value={value.duracion}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        autoComplete="off"
                    />
                    <Form.Text className="text-danger">{errors.name === "duracion" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6 my-3'}>
                    <Button onClick={() => agregarHorario()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>

            </Form>

            <ListHorario eliminar={eliminar} lugares={evento.lugar} />

            <p className={'my-4 text-center text-muted'}>
                <small className="text-danger">{errors.name === "horario" && errors.error}</small>
            </p>

            <Button onClick={() => nextPage()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container>
    )
}


interface HorarioProps {
    lugares: Lugar[]
    eliminar: (lugar: string, fecha: string, hora: string) => void;
}

const ListHorario = (props: HorarioProps) => {

    const { lugares, eliminar } = props;

    return (
        <Container>
            <Table striped className={'my-4 border rounded text-muted'}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        (lugares.length > 0) &&
                        lugares.map((lugar, index) => {
                            let lugarNombre = lugar.nombre;
                            let data = lugar.horario.map((horario, index) => (
                                <tr key={horario.fecha + index} >
                                    <td>{lugarNombre}</td>
                                    <td>{horario.fecha.toString()}</td>
                                    <td>{horario.hora}</td>
                                    <td>
                                        <button onClick={() => eliminar(lugar.nombre, horario.fecha, horario.hora)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
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

export default HorarioCreate