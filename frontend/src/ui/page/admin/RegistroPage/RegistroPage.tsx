import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { BTN_PRIMARY, CARD } from '../../../const/theme'
import { useParams } from 'react-router-dom';
import useRegistro from '../../../../hook/useRegistro';
import { RegistroEntrada } from '../../../../api/interface/ResponseRegistroEntrada';

const RegistroPage = () => {

    const params = useParams();
    const [registro, setregistro] = useState<RegistroEntrada[]>([] as RegistroEntrada[]);
    const { getRegistroEntradasByLugar } = useRegistro();

    useEffect(() => {
        getRegistro();
    }, []);

    const getRegistro = async () => {
        let data = await getRegistroEntradasByLugar(Number(params.idLugar));
        if (data != null) {
            setregistro(data);
        }
    }

    return (
        <Container className={'mt-4 text-dark'}>
            <h4 className=''>Listado de Registros</h4>
            <hr />

            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <Table className={"striped "}>
                    <thead>
                        <tr>
                            <th>Encargado</th>
                            <th>Fecha</th>
                            <th>Sector</th>
                            <th>Espacio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registro.map((reg) => (
                                <tr key={reg.entrada.id}>
                                    <td>{reg.encargado}</td>
                                    <td>{reg.fecha.toString()}</td>
                                    <td>{reg.entrada.sector}</td>
                                    <td>{reg.entrada.espacio}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </Container >
    )
}

export default RegistroPage