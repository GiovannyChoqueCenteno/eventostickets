import { Button, Container, Table } from "react-bootstrap"
import useFactura from "../../../../hook/useFactura";
import { useAppSelector } from "../../../../redux/store/config";
import { BTN_PRIMARY, CARD } from "../../../const/theme"
import moment from 'moment';
import { Link } from "react-router-dom";

const MyBuyPage = () => {

    const usuario = useAppSelector((s) => s.usuario);
    const { facturas } = useFactura({ usuarioId: Number(usuario.id) });

    return (
        <Container className={'mt-4 p-4 text-dark'}>
            <h4 className=''>Facturas</h4>
            <hr />
            <Container className={'rounded shadow p-3'} style={{ backgroundColor: CARD }}>
                <h4>Mis Facturas</h4>
                <hr />
                <Table className={"striped"} >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>fecha</th>
                            <th>total</th>
                            <th>detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            facturas.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.id}</td>
                                    <td>{moment(f.fecha).format('lll')}</td>
                                    <td>{f.total}</td>
                                    <td>
                                        <Link to={`/detalle/${f.id}`} className={'btn text-white'} style={{ backgroundColor: BTN_PRIMARY }}>
                                            detalle
                                        </Link>
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

export default MyBuyPage