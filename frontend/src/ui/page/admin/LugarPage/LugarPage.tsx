import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Container, Table } from 'react-bootstrap'
import { BTN_PRIMARY, CARD } from '../../../const/theme'
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomLugar } from '../../../../hook/useCustomLugar';
import { ResponseLugarHorario } from '../../../../api/interface/ResponseLugarHorarios';

const LugarPage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [lugares, setlugares] = useState<ResponseLugarHorario[]>([] as ResponseLugarHorario[]);
    const { getLugarByEvent } = useCustomLugar();

    useEffect(() => {
        getLugares();
    }, []);

    const getLugares = async () => {
        let data = await getLugarByEvent(Number(params.idEvento));
        if (data != null) {
            setlugares(data);
        }
    }


    return (
        <Container className={'mt-4 text-dark'}>
            <h4 className=''>Listado Lugares</h4>
            <hr />

            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <Table className={"striped "}>
                    <thead>
                        <tr>
                            <th>Lugar</th>
                            <th>Registros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lugares.map((lugar) => (
                                <tr key={lugar.id}>
                                    <td>{lugar.nombre}</td>
                                    <td>
                                        <button onClick={() => { navigate(`/main/admin/lugar/registro/${lugar.id}`) }} className={'btn'} style={{ backgroundColor: BTN_PRIMARY }}>
                                            <FontAwesomeIcon icon={faCalendarCheck} color={"white"} />
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

export default LugarPage