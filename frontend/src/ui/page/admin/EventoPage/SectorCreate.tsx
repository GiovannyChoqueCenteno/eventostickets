import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import useForm from '../../../../hook/useForm';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';
import { BTN_PRIMARY, BTN_RED, CARD } from '../../../const/theme'
import { ErrorMap, Sector } from './interface/interface';
import { schemaSector } from './validacion/schemaSector';
import { createSector } from '../../../../redux/middleware/evento';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}

const SectorCreate = (props: Props) => {

    const { setstep } = props;
    const dispatch = useAppDispatch();
    const { lugar } = useAppSelector((s) => s.evento);
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);
    const [sector, setsector] = useState<Sector[]>([] as Sector[]);
    const { value, onChange, setData, reset } = useForm<Sector>({
        nombre: "",
        capacidad: 0,
        lugar: lugar[0].nombre,
        id_lugar: lugar[0].id
    });

    const OnSelectLugar = (value: string) => {
        let lugarAndId = value.split(',');
        setData({
            id_lugar: lugarAndId[0],
            lugar: lugarAndId[1]
        });
    }

    const Onchange = (e: React.FormEvent<HTMLInputElement>) => {
        validarCampos();
        onChange(e);
    }

    const agregar = () => {
        validarCampos();
        schemaSector.validate(value).then(() => {
            if (validarCapacidadLugarSector()) {
                setsector((s) => [...s, value]);
                reset();
            }
        });
    }

    const eliminar = (id_lugar: number, nombre_sector: string) => {
        let keyDelete = `${id_lugar}${nombre_sector}`;
        let sectorFilter = sector.filter((sector) => {
            let key = `${sector.id_lugar}${sector.nombre}`;
            if (key !== keyDelete) return true;
            return false;
        });
        setsector(sectorFilter);
    }

    const validarCapacidadLugarSector = (): boolean => {
        let isValidCapacidad = true;
        lugar.find(lugar => {
            if (value.lugar === lugar.nombre) {
                let capacidadLugar = lugar.capacidad;
                sector.forEach((sector) => {
                    if (sector.lugar === lugar.nombre)
                        capacidadLugar = capacidadLugar - sector.capacidad;
                })
                capacidadLugar = capacidadLugar - value.capacidad;
                if (capacidadLugar < 0) {
                    isValidCapacidad = false;
                    seterrors({
                        name: "sector",
                        error: `No se puede agregar esa capacidad, capacidad limte del lugar ${lugar.nombre} es ${lugar.capacidad}`,
                    });
                }
                return true;//break
            }
        });
        return isValidCapacidad;
    }

    const validarCampos = () => {
        seterrors({
            name: "",
            error: ""
        });
        schemaSector.validate(value).catch((err) => {
            seterrors({
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const validarLugarWithSector = (): boolean => {
        let isValidLugarWithSector = true;
        lugar.forEach((lugar) => {
            let result = sector.find((sector) => sector.lugar === lugar.nombre);
            if (result === undefined) isValidLugarWithSector = false;
        });
        if (!isValidLugarWithSector)
            seterrors({ name: "sector", error: "todos los lugares deben tener al menos un sector!!!" })
        return isValidLugarWithSector;
    }

    const save = async () => {
        if (validarLugarWithSector()) {
            await dispatch(createSector(sector));
            setstep((next) => next + 1);
        }
    };

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

                <Form.Group className={'col-md-6 my-3'}>
                    <Button onClick={() => agregar()} variant={""} className={'text-white'} style={{ backgroundColor: BTN_PRIMARY }}>agregar</Button>
                </Form.Group>
            </Form>

            <ListSector eliminar={eliminar} sector={sector} />

            <p className={'my-4 text-center text-muted'}>
                <small className="text-danger">{errors.name === "sector" && errors.error}</small>
            </p>

            <Button onClick={() => save()} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>

        </Container>
    )
}

interface SectorProps {
    sector: Sector[];
    eliminar: (id_lugar: number, nombre_sector: string) => void;
}

const ListSector = (props: SectorProps) => {

    const { sector, eliminar } = props;

    return (
        <Container>
            <Table striped className={'my-4 border rounded text-muted'}>
                <thead>
                    <tr>
                        <th>lugar</th>
                        <th>sector</th>
                        <th>capacidad</th>
                        <th>eliminar</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        (sector.length > 0) && (
                            sector.map((sector, index) => (
                                <tr key={index}>
                                    <td>{sector.lugar}</td>
                                    <td>{sector.nombre}</td>
                                    <td>{sector.capacidad}</td>
                                    <td>
                                        <button onClick={() => eliminar(sector.id_lugar, sector.nombre)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
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


export default SectorCreate