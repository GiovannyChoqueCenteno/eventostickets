import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Container, Table } from 'react-bootstrap'
import { CARD, BTN_RED, BTN_GREEN } from '../../../const/theme'
import { useLoadEvent } from '../../../../hook/useLoadEvent';

const HomePage = () => {

    const { evento, loading } = useLoadEvent();

    return (
        <Container className={'mt-4 text-dark'}>

            <h4 className=''>Listado Eventos</h4>
            <hr />

            <Container className={'rounded shadow p-2'} style={{ backgroundColor: CARD }}>
                <Table className={"striped"}>

                    <thead>
                        <tr>
                            <th>name</th>
                            <th>eliminar</th>
                            <th>editar</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            loading &&
                            <p className={'text-center'}><small>loading...</small></p>
                        }
                        {
                            (!loading && evento.length === 0)
                                ? <p className={'text-center'}><small>No se crearon eventos!!!</small></p>
                                :
                                evento.map((evento) => (
                                    <tr>
                                        <th>{evento.titulo}</th>
                                        <th>
                                            <button className={'btn'} style={{ backgroundColor: BTN_RED }}>
                                                <FontAwesomeIcon icon={faTrashAlt} color={"white"} />
                                            </button>
                                        </th>
                                        <th>
                                            <button className={'btn'} style={{ backgroundColor: BTN_GREEN }}>
                                                <FontAwesomeIcon icon={faEdit} color={"white"} />
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