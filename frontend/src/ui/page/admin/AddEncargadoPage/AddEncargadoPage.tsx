import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { BTN_GREEN, BTN_RED, CARD } from '../../../const/theme'
import useEncargado from '../../../../hook/useEncargado';
import { useParams } from 'react-router-dom';

const AddEncargadoPage = () => {

    const params = useParams();
    const { encargados, encargadosEvent, getAllEncargados, getEncargadosEvent, add, remove } = useEncargado();

    useEffect(() => {
        getAllEncargados();
        getEncargadosEvent(Number(params.idEvento));
    }, []);

    return (
        <Container className={'mt-4 text-dark'}>
            <h4 className=''>Asignacion Encargados</h4>
            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <h4>Encargados del Evento</h4>
                <Table className={"striped text-center"}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>email</th>
                            <th>eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            encargadosEvent.map((evento) => (
                                <tr key={evento.encargado.id}>
                                    <td>{evento.encargado.id}</td>
                                    <td>{evento.encargado.nombre} </td>
                                    <td>{evento.encargado.email}</td>
                                    <td>
                                        <button onClick={() => remove(Number(params.idEvento), evento.encargado)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                            <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <h4>Lista de Encargados</h4>
                <Table className={"striped text-center"}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>email</th>
                            <th>agregar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            encargados.map((encargado) => (
                                <tr key={encargado.id}>
                                    <td>{encargado.id}</td>
                                    <td>{encargado.nombre} </td>
                                    <td>{encargado.email}</td>
                                    <td>
                                        <button onClick={() => add(Number(params.idEvento), encargado)} className={'btn'} style={{ backgroundColor: BTN_GREEN }}>
                                            <FontAwesomeIcon icon={faPlusSquare} color={"white"} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>


            </Container>
        </Container>
    )
}

export default AddEncargadoPage