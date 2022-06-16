import React, { useState } from 'react';
import { Container, Row, Col, Collapse, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket, faCalendar, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { SELECT, SIDEBAR } from '../../const/theme';
import logo from '../../assets/image/logo.png';
import { useAppDispatch, useAppSelector } from '../../../redux/store/config';
import { actionUsuario } from '../../../redux/slice/usuarioSlice';

interface Props {
    children: JSX.Element
}

const Sidebar = (props: Props) => {

    const { children } = props;
    const navigate = useNavigate();
    const usuario = useAppSelector((s) => s.usuario);
    const dispatch = useAppDispatch();
    const [open, setopen] = useState<boolean>(true);
    const logout = () => {
        dispatch(actionUsuario.logout());
        navigate("/", { replace: true });
    }

    return (
        <Container fluid >
            <Row className={"flex-nowrap"}>
                <Col style={sidebar} className={"col-auto p-0"}>
                    <div style={{ minHeight: '100vh' }}>
                        <Collapse in={open} dimension="width" className='p-3'>
                            <div>
                                <Link to={(usuario.type === "admin") ? "/main/admin" : "/"} className={'text-decoration-none'} >
                                    <div className={'text-center'}>
                                        <Image style={{ width: 130 }} src={logo} alt={'logo'} />
                                    </div>
                                </Link>
                                <hr />
                                {
                                    usuario.type === "admin" && (
                                        <>
                                            <Link to={"/main/admin/evento/create"} style={{ backgroundColor: SELECT }} className='text-decoration-none text-white mx-3 d-block my-3 p-1 rounded'>
                                                <FontAwesomeIcon className={"me-2 my-0 "} color='#fff' icon={faCalendar} size={"1x"} />
                                                <small>Crear Evento</small>
                                            </Link>
                                            <Link to={"/main/admin"} style={{ backgroundColor: SELECT }} className='text-decoration-none text-white mx-3 d-block my-3 p-1 rounded'>
                                                <FontAwesomeIcon className={"me-2 my-0"} color='#fff' icon={faHandshake} size={"1x"} />
                                                <small>Listar Eventos</small>
                                            </Link>
                                        </>
                                    )
                                }

                                {
                                    usuario.type === "cliente" && (
                                        <>
                                            <h6 className={"text-center text-white"}>{usuario.nombre}</h6>
                                            <Link to={"/factura"} style={{ backgroundColor: SELECT }} className='text-decoration-none text-white mx-3 d-block my-3 p-1 rounded'>
                                                <FontAwesomeIcon className={"me-2 my-0 "} color='#fff' icon={faCalendar} size={"1x"} />
                                                <small>Mis Compras</small>
                                            </Link>
                                        </>
                                    )
                                }

                            </div>
                        </Collapse>
                    </div>
                </Col>
                <Col>

                    <div className={'position-relative'}>
                        <FontAwesomeIcon icon={faBars} size={"1x"} onClick={() => setopen(!open)} className={'icon-menu pointer'} />
                        {
                            usuario.isAuthenticated && (
                                <a className='icon-perfil'>
                                    <span className='me-2'>logout</span>
                                    <FontAwesomeIcon onClick={logout} icon={faRightFromBracket} size={"1x"} className={'pointer my-0'} />
                                </a>
                            )
                        }
                    </div>
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
