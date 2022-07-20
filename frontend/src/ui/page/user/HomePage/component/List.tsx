import React from 'react'
import { Container, Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Evento } from '../../../../../api/model/Evento'
import { BTN_PRIMARY } from '../../../../const/theme'
import { URL } from '../../../../const/url'

interface Props {
    data: Evento[]
}

const List = (props: Props) => {

    const { data } = props;

    return (
        <Container className={'d-flex flex-wrap justify-content-around'}>
            {
                data.map((evento) => (
                    <Card key={evento.id} className={'m-2'} style={{ width: 300 }} >
                        <Card.Header className={'p-0'}>
                            <Image className={'w-100'} src={`${URL.baseUrl}/foto/firts/${evento.id}`} alt={'imagen'} />
                        </Card.Header>
                        <Card.Body>
                            <h4>{evento.titulo}</h4>
                            <p>
                                {evento.descripcion}
                            </p>
                            <Link to={`/detail`} state={evento}>
                                <Button variant={''} className={'text-white w-100'} style={{ backgroundColor: BTN_PRIMARY }} >ver evento</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}

export default List