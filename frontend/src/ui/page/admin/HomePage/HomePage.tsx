import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Container, Spinner, Table } from 'react-bootstrap'
import { CARD, BTN_RED, BTN_GREEN } from '../../../const/theme'
import { useLoadEvent } from '../../../../hook/useLoadEvent';

const HomePage = () => {

    const { evento, loading, eliminar } = useLoadEvent();

    const Eliminar = (idEvento: number) => {
        if (window.confirm('Esta seguro de eliminar el evento ?'))
            eliminar(idEvento);
    }

    return (
        <Container className={'mt-4 text-dark'}>

            <h4 className=''>Listado Eventos</h4>
            <hr />

            <Container className={'rounded shadow p-2'} style={{ backgroundColor: CARD }}>
                <Table className={"striped"}>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>organizador</th>
                            <th>estado</th>
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
                                    <th>{evento.titulo}</th>
                                    <th>{evento.organizador}</th>
                                    <th>{evento.estadoId}</th>
                                    <th>
                                        <button onClick={() => Eliminar(evento.id)} className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                            <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                        </button>
                                    </th>
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