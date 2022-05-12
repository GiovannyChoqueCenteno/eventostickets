import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme';
import { ErrorMap } from './interface/interface';
import useForm from '../../../../hook/useForm';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import { schemaLugar } from './validacion/schemaLugar';
import MapLeaflet from '../../../component/MapLeaflet';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { Horario, Lugar, Sector } from '../../../../redux/interface/evento';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const LugarCreate = (props: Props) => {

    const { setstep } = props;
    const evento = useAppSelector((s) => s.evento);
    const [lugares, setlugares] = useState<Lugar[]>([] as Lugar[]);
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const dispatch = useAppDispatch();

    const { value, onChange, setData, reset } = useForm({
        nombre: "",
        direccion: "",
        capacidad: 0,
        longitud: "",
        latitud: "",
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
        schemaLugar.validate(value).catch((err) => {
            seterrors({
                ...errors,
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const eliminarLugar = (nombre: string) => {
        let lugaresFilter = lugares.filter((lugar) => lugar.nombre !== nombre);
        setlugares(lugaresFilter);
    }

    const saveLugar = () => {
        validarCampos();
        schemaLugar.validate(value).then(() => {
            setlugares((lugares) => [...lugares, {
                ...value,
                horario: [],
                sector: []
            }]);
            reset();
        });
    }

    const onClickMap = async (lat: number, lng: number) => {
        setData({ latitud: lat, longitud: lng });
        validarCampos();
    }

    const saveStore = () => {
        dispatch(actionEvento.addLugar(lugares));
        setstep((next) => next + 1);
    }

    return (
        <Container style={{ backgroundColor: CARD }}>
            <h5 className='text-muted'>Crear Lugar</h5>
            <Form className='row text-muted'>

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Nombre del Lugar</small></Form.Label>
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
                    <Form.Label><small>Direccion</small></Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'ed...'}
                        name={'direccion'}
                        autoComplete="off"
                        value={value.direccion}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Form.Text className="text-danger">{errors.name === "direccion" && errors.error}</Form.Text>
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

                <p className="text-danger">
                    <small>{(errors.name === "longitud" || errors.name === "latitud") && errors.error}</small>
                </p>

                {/*Mapa  */}

                <MapLeaflet
                    sizeheight='300px'
                    sizewidth='100%'
                    onClickMap={onClickMap}
                    popup={value.nombre}
                />

                <Form.Group className={'col-md-6 my-3'}>
                    <Button onClick={() => saveLugar()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>

            </Form>

            <hr />

            <ListLugar eliminar={eliminarLugar} lugares={lugares} />

            <Button onClick={() => saveStore()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container>
    )
}

interface PropsList {
    lugares: Lugar[]
    eliminar: (nombre: string) => void;
}

const ListLugar = (props: PropsList) => {

    const { lugares, eliminar } = props;

    return (
        <Container>
            <Table striped className={'my-4 border rounded text-muted'}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Longitud</th>
                        <th>Latitud</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        (lugares.length > 0) &&
                        lugares.map((lugar, index) => (
                            <tr key={lugar.nombre + index} >
                                <td>{lugar.nombre}</td>
                                <td>{lugar.capacidad}</td>
                                <td>{lugar.longitud}</td>
                                <td>{lugar.latitud}</td>
                                <td>
                                    <button onClick={() => eliminar(lugar.nombre)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                        <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <p className={'my-4 text-center text-muted'}>
                {lugares.length === 0 && <small>Agregue lugares !!!</small>}
            </p>
        </Container>

    )
}

export default LugarCreate



