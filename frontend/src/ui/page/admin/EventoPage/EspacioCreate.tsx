import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'

import useForm from '../../../../hook/useForm';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme'
import { ErrorMap, Espacio } from './interface/interface';
import { schemaEspacio } from './validacion/schemaEspacio';
import { createEspacio } from '../../../../redux/middleware/evento';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const EspacioCreate = (props: Props) => {

    const { setstep } = props;
    const dispatch = useAppDispatch();
    const { lugar } = useAppSelector((s) => s.evento);
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const [espacio, setespacio] = useState<Espacio[]>([] as Espacio[]);
    const { value, onChange, reset, setData } = useForm<Espacio>({
        nombre: "",
        descripcion: "",
        capacidad: 0,
        cantidad: 0,
        lugar: lugar[0].nombre,
        sector: lugar[0].sector[0].nombre,
        id_sector: lugar[0].sector[0].id,
        precio: 0
    });

    const OnSelectSector = (value: string) => {
        let lugarSectorIdSector = value.split(',');
        setData({
            lugar: lugarSectorIdSector[0],
            sector: lugarSectorIdSector[1],
            id_sector: lugarSectorIdSector[2]
        })
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
        schemaEspacio.validate(value).catch((err) => {
            seterrors({
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const agregar = () => {
        validarCampos();
        schemaEspacio.validate(value).then(() => {
            if (validarCapacidadSector()) {
                setespacio((e) => [...e, value]);
                reset();
            }
        });
    }

    const eliminar = (nombre_lugar: string, nombre_sector: string, nombre_espacio: string) => {
        let keyDelete = `${nombre_lugar}${nombre_sector}${nombre_espacio}`;
        let espacioFilter = espacio.filter((esp) => {
            let key = `${esp.lugar}${esp.sector}${esp.nombre}`;
            if (key !== keyDelete) return true;
        });
        setespacio(espacioFilter);
    }

    const validarCapacidadSector = (): boolean => {
        let isValidEspacio = true;
        lugar.find((lugar) => {
            if (lugar.nombre === value.lugar) {
                lugar.sector.find((sector) => {
                    if (sector.nombre === value.sector) {
                        let capacidadSector = sector.capacidad;
                        espacio.forEach((esp) => {
                            let { capacidad, cantidad } = esp;
                            if (esp.sector === value.sector && esp.lugar == value.lugar)
                                capacidadSector = capacidadSector - (cantidad * capacidad)
                        });
                        capacidadSector = capacidadSector - (value.capacidad * value.cantidad);
                        if (capacidadSector < 0) {

                            isValidEspacio = false;
                            seterrors({
                                name: "espacio",
                                error: `No se puede agregar esa capacidad, capacidad limite del sector ${lugar.nombre}/${sector.nombre} es ${sector.capacidad}`,
                            });
                        }
                        return true;//break
                    }
                });
                return true;
            }
        });
        return isValidEspacio;
    }

    const validarSectorWithEspacio = () => {
        let isValidSectorWithEspacio = true;
        lugar.forEach((lug) => {
            lug.sector.forEach((sector) => {
                let res = espacio.find((esp) => esp.sector === sector.nombre);
                if (res === undefined) isValidSectorWithEspacio = false;
            })
        });
        if (!isValidSectorWithEspacio)
            seterrors({ name: "espacio", error: "todos los sectores debe tener al menos un espacio!!!" });
        return isValidSectorWithEspacio;
    }

    const save = async () => {
        if (validarSectorWithEspacio()) {
            await dispatch(createEspacio(espacio));
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
                        onChange={(e) => OnSelectSector(e.target.value)}
                        value={`${value.lugar},${value.sector},${value.id_sector}`}
                    >
                        {
                            lugar.map((lugar) => {
                                let html = lugar.sector.map((sector, index) => (
                                    <option key={index} value={`${lugar.nombre},${sector.nombre},${sector.id}`}>{`${lugar.nombre}/${sector.nombre}`}</option>
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

                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Precio</small></Form.Label>
                    <Form.Control
                        type={'number'}
                        placeholder={'precio'}
                        name={'precio'}
                        autoComplete="off"
                        value={value.precio}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Form.Text className="text-danger">{errors.name === "cantidad" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6'}></Form.Group>

                <Form.Group className={'col-md-6 my-3 '}>
                    <Button onClick={() => agregar()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>

            </Form>

            <ListSector eliminar={eliminar} espacio={espacio} />

            <p className={'my-4 text-center text-muted'}>
                <small className="text-danger">{errors.name === "espacio" && errors.error}</small>
            </p>

            <Button onClick={() => save()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container >
    )
}


interface EspacioProps {
    espacio: Espacio[];
    eliminar: (nombre_lugar: string, nombre_sector: string, nombre_espacio: string) => void;
}


const ListSector = (props: EspacioProps) => {

    const { espacio, eliminar } = props;

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
                <tbody>
                    {
                        espacio.length > 0 && (
                            espacio.map((espacio, index) => (
                                <tr key={index}>
                                    <td><small>{`${espacio.lugar}/${espacio.sector}`}</small></td>
                                    <td>{espacio.nombre}</td>
                                    <td>{espacio.cantidad}</td>
                                    <td>{espacio.capacidad}</td>
                                    <td>
                                        <button onClick={() => eliminar(espacio.lugar, espacio.sector, espacio.nombre)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                            <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </Table>

        </Container>
    )
}

export default EspacioCreate