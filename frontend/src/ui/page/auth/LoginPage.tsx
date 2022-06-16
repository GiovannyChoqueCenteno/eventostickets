import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { CARD, BTN_PRIMARY } from '../../const/theme'
import security from '../../assets/image/security.svg';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../../hook/useForm';
import apiBackend from '../../../api/apiBackend';
import { actionUsuario } from '../../../redux/slice/usuarioSlice';
import { ResponseToken } from '../../../api/interface/ResponseToken';
import { useAppDispatch, useAppSelector } from '../../../redux/store/config';
import { AxiosError } from 'axios';
import { ErrorValidacion } from '../../../api/interface/ErrorValidacion';


const LoginPage = () => {

    const [error, seterror] = useState("");
    const dispatch = useAppDispatch();
    const cart = useAppSelector((s) => s.cart);
    const navigate = useNavigate();
    const { value, onChange } = useForm({
        email: "",
        password: ""
    });

    const OnSubmit = async (e: React.SyntheticEvent) => {
        seterror("");
        e.preventDefault();
        try {
            const response = await apiBackend.post<ResponseToken>(`/usuario/login`, value);
            let token = response.data.token;
            dispatch(actionUsuario.addUsuario({ token }));
        } catch (errors) {
            console.log(errors);
            let error = errors as AxiosError;
            if (error.response) {
                let messageError = error.response.data as ErrorValidacion;
                seterror(messageError.msg);
            }
        }
    }

    return (
        <Container className={'vh-100 d-flex align-items-center justify-content-center'}>
            <Container style={{ minHeight: 350, width: 700 }} className={'shadow'}>
                <Row className={'h-100'}>
                    <Col md={5} style={{ backgroundColor: BTN_PRIMARY }} className={'d-flex flex-column align-items-center justify-content-evenly rounded'}>
                        <h3 className={'text-white text-center'}>Welcome Evento App</h3>
                        <img style={{ height: 150 }} src={security} alt="security" />
                    </Col>
                    <Col md={7} style={{ backgroundColor: CARD }} className={'p-5 rounded'}>
                        <Form onSubmit={OnSubmit} className='py-2'>
                            <h3 className={'text-center'}>Login</h3>
                            <Form.Group className={'my-3'}>
                                <Form.Control
                                    type={'email'}
                                    name={'email'}
                                    value={value.email}
                                    placeholder={'ed@ed.com'}
                                    onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                                />
                            </Form.Group>
                            <Form.Group className={'my-3'}>
                                <Form.Control
                                    type={'password'}
                                    name={'password'}
                                    value={value.password}
                                    placeholder={'********'}
                                    onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                                />
                            </Form.Group>
                            {
                                <p className={"text-danger text-center"}><small>{error}</small></p>
                            }
                            <Form.Group className={'my-3'}>
                                <Button type={"submit"} variant="" style={{ backgroundColor: BTN_PRIMARY }} className={'w-100 text-white'}>
                                    login
                                </Button>
                            </Form.Group>

                            <Form.Group className={'my-3'}>
                                <p className={"text-center"}>
                                    <Link className={"text-center"} to={"/auth/user/register"}>¿No tienes una cuenta? Registrate</Link>
                                </p>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default LoginPage