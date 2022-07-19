import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faUserGroup, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import { CARD, BTN_RED, SELECT, BTN_GREEN, BTN_PRIMARY } from '../../../const/theme'
import { useLoadEvent } from '../../../../hook/useLoadEvent';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();
    const { evento, loading, eliminar, getMyEvent } = useLoadEvent();

    const Eliminar = (idEvento: number) => {
        if (window.confirm('Esta seguro de eliminar el evento ?'))
            eliminar(idEvento);
    }

    useEffect(() => {
        getMyEvent()
    }, [])

    return (
        <Container className={'mt-4 text-dark'}>

            <h4 className=''>Listado Eventos</h4>
            <hr />

            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <Button onClick={() => navigate('/main/admin/evento/create')} variant="" style={{ backgroundColor: SELECT, color: "white" }} >
                    Crear Evento
                </Button>
                <Table className={"striped "}>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>organizador</th>
                            <th>encargado</th>
                            <th>registro</th>
                            <th>editar</th>
                            <th>eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading && (
                                <tr>
                                    <td className='text-center' colSpan={3}>
                                        <Spinner animation="grow" variant="dark" />
                                    </td>
                                </tr>
                            )
                        }
                        {
                            (!loading && evento.length === 0) && (
                                <tr>
                                    <td className='text-center' colSpan={3}>
                                        <small>No existen eventos creados!!!</small>
                                    </td>
                                </tr>
                            )
                        }

                        {
                            evento.map((evento) => (
                                <tr key={evento.id}>
                                    <td>{evento.titulo}</td>
                                    <td>{evento.organizador}</td>
                                    <td>
                                        <button onClick={() => { navigate(`/main/admin/encargado/add/${evento.id}`) }} className={'btn'} style={{ backgroundColor: BTN_GREEN }}>
                                            <FontAwesomeIcon icon={faUserGroup} color={"white"} />
                                        </button>
                                    </td>

                                    <td>
                                        <button onClick={() => { navigate(`/main/admin/lugar/${evento.id}`) }} className={'btn'} style={{ backgroundColor: BTN_GREEN }}>
                                            <FontAwesomeIcon icon={faUserGroup} color={"white"} />
                                        </button>
                                    </td>

                                    <td>
                                        <Link to={`/main/admin/evento/edit`} state={{ evento }} className={'btn'} style={{ backgroundColor: BTN_PRIMARY }}>
                                            <FontAwesomeIcon icon={faEdit} color={"white"} />
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => Eliminar(evento.id)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                            <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
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

export default HomePage;
