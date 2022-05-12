import React, { useState } from 'react';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendar, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { SELECT, SIDEBAR } from '../../const/theme';

interface Props {
    children: JSX.Element
}

const Sidebar = (props: Props) => {

    const [open, setopen] = useState<boolean>(true);
    const { children } = props;

    return (
        <Container fluid >
            <Row className={"flex-nowrap"}>
                <Col style={sidebar} className={"col-auto p-0"}>
                    <div style={{ minHeight: '100vh' }}>
                        <Collapse in={open} dimension="width" className='p-3'>
                            <div>
                                <Link className={'text-decoration-none'} to="#">
                                    <p className='text-white m-2'>Admin Prueba</p>
                                </Link>
                                <hr />
                                <Link to={"/main/admin/evento/create"} style={{ backgroundColor: SELECT }} className='text-decoration-none text-white mx-3 d-block my-3 p-1 rounded'>
                                    <FontAwesomeIcon className={"me-2 my-0 "} color='#fff' icon={faCalendar} size={"1x"} />
                                    <small>Crear Evento</small>
                                </Link>
                                <Link to={"/main/admin"} style={{ backgroundColor: SELECT }} className='text-decoration-none text-white mx-3 d-block my-3 p-1 rounded'>
                                    <FontAwesomeIcon className={"me-2 my-0"} color='#fff' icon={faHandshake} size={"1x"} />
                                    <small>Listar Eventos</small>
                                </Link>
                            </div>
                        </Collapse>
                    </div>
                </Col>
                <Col>
                    <FontAwesomeIcon icon={faBars} size={"1x"} onClick={() => setopen(!open)} className={'icon-menu pointer'} />
                    <Row>
                        <Col sm={12}>
                            {children}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

const sidebar = {
    backgroundColor: SIDEBAR,
    color: "#fff",
}

export default Sidebar
