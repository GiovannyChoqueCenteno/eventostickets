import React, { useState } from 'react';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { SIDEBAR } from '../../const/theme';

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
                                <Link to={"#"} className='text-decoration-none text-white mx-3'>
                                    <p>
                                        <FontAwesomeIcon className={"me-2"} color='#fff' icon={faAppleAlt} size={"1x"} />
                                        <small>EVENTOS</small>
                                    </p>
                                </Link>
                                <Link to={"#"} className='text-decoration-none text-white mx-3'>
                                    <p>
                                        <FontAwesomeIcon className={"me-2"} color='#fff' icon={faAppleAlt} size={"1x"} />
                                        <small>EVENTOS</small>
                                    </p>
                                </Link>
                                <Link to={"#"} className='text-decoration-none text-white mx-3'>
                                    <p>
                                        <FontAwesomeIcon className={"me-2"} color='#fff' icon={faAppleAlt} size={"1x"} />
                                        <small>EVENTOS</small>
                                    </p>
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