import React, { Dispatch, SetStateAction, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Form, Table } from 'react-bootstrap'

import useForm from '../../../../hook/useForm';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config'
import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme';
import { ErrorMap, Horario } from './interface/interface';
import { schemaHorario } from './validacion/schemaHorario';
import { createHorario } from '../../../../redux/middleware/evento';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const HorarioCreate = (props: Props) => {

    const { setstep } = props;
    const dispatch = useAppDispatch();
    const { lugar } = useAppSelector((s) => s.evento);
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const [horario, sethorario] = useState<Horario[]>([] as Horario[]);
    const { value, onChange, setData, reset } = useForm<Horario>({
        id_lugar: lugar[0].id,
        lugar: lugar[0].nombre,
        fecha: "",
        hora: "",
        duracion: 0,
    });

    const Onchange = (e: React.FormEvent<HTMLInputElement>) => {
        validarCampos();
        onChange(e);
    }

    const OnSelectLugar = (value: string) => {
        let lugarAndId = value.split(',');
        setData({
            id_lugar: lugarAndId[0],
            lugar: lugarAndId[1]
        });
    }

    const agregar = () => {
        validarCampos();
        schemaHorario.validate(value).then(() => {
            sethorario((h) => [...h, value]);
            reset();
        });
    }

    const eliminar = (id_lugar: string, fecha: string, hora: string) => {
        let keyDelete = `${id_lugar}${fecha}${hora}`;
        let horarioFilter = horario.filter((h) => {
            let key = `${h.id_lugar}${h.fecha}${h.hora}`;
            if (key !== keyDelete) return true
            return false;
        });
        sethorario(horarioFilter);
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
        lugar.forEach((lugar) => {
            let result = horario.find((h) => h.lugar === lugar.nombre);
            if (result === undefined) isValidLugarWithHorario = false;
        });
        if (!isValidLugarWithHorario)
            seterrors({ name: "horario", error: "todos los lugares debe tener al menos un horario!!!" });
        return isValidLugarWithHorario;
    }

    const save = async () => {
        if (validarLugarWithHorario()) {
            await dispatch(createHorario(horario));
            setstep((next) => next + 1);
        }
    }

    return (
        <Container style={{ backgroundColor: CARD }}>
            <h5 className='text-muted'>Crear Horario</h5>
            <Form className='row text-muted'>
                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Lugares</small></Form.Label>
                    <Form.Select
                        name={'lugar'}
                        onChange={(e) => OnSelectLugar(e.target.value)}
                        value={`${value.id_lugar},${value.lugar}`}
                    >
                        {
                            lugar.map((lugar) => (
                                <option key={lugar.id} value={`${lugar.id},${lugar.nombre}`}>{lugar.nombre}</option>
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
                    <Button onClick={() => agregar()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>

            </Form>

            <ListHorario eliminar={eliminar} horario={horario} />

            <p className={'my-4 text-center text-muted'}>
                <small className="text-danger">{errors.name === "horario" && errors.error}</small>
            </p>

            <Button onClick={() => save()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container>
    )
}

interface HorarioProps {
    horario: Horario[]
    eliminar: (lugar: string, fecha: string, hora: string) => void;
}

const ListHorario = (props: HorarioProps) => {

    const { horario, eliminar } = props;

    return (
        <Container>
            <Table striped className={'my-4 border rounded text-muted'}>
                <thead>
                    <tr>
                        <th>Lugar</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (horario.length > 0) &&
                        horario.map((horario, index) => (
                            <tr key={index}>
                                <td>{horario.lugar}</td>
                                <td>{horario.fecha.toString()}</td>
                                <td>{horario.hora}</td>
                                <td>
                                    <button onClick={() => eliminar(horario.id_lugar, horario.fecha, horario.hora)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                        <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </Container>
    )
}

export default HorarioCreate