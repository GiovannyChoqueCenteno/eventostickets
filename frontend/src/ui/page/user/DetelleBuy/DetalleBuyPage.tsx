import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import apiBackend from '../../../../api/apiBackend'
import useDetalle from '../../../../hook/useDetalle'
import { BTN_PRIMARY, CARD } from '../../../const/theme'

const DetalleBuyPage = () => {

    const params = useParams();
    const { detalle } = useDetalle({ facturaId: Number(params.facturaId) });

    return (
        <Container className={'mt-4 p-4 text-dark'}>
            <h4 className=''>Detalle</h4>
            <hr />
            <Container className={'rounded shadow p-3'} style={{ backgroundColor: CARD }}>
                <h4>Detalle Factura</h4>
                <hr />
                <Table className={"striped"}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>costo</th>
                            <th>cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detalle.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td>{d.costo}</td>
                                    <td>{d.cantidad}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </Container>
        </Container>
    )
}

export default DetalleBuyPage