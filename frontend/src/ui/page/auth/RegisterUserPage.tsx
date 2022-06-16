import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { CARD, BTN_PRIMARY } from '../../const/theme'
import security from '../../assets/image/security.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useForm from '../../../hook/useForm';
import apiBackend from '../../../api/apiBackend';
import { ResponseToken } from '../../../api/interface/ResponseToken';
import { useAppDispatch } from '../../../redux/store/config';
import { actionUsuario } from '../../../redux/slice/usuarioSlice';

const RegisterUserPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { value, onChange } = useForm({
    nombre: "",
    email: "",
    password: ""
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await apiBackend.post<ResponseToken>(`/usuario`, value);
      let token = response.data.token;
      dispatch(actionUsuario.addUsuario({ token }));
      navigate(`/`, { replace: true });
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container className={'vh-100 d-flex align-items-center justify-content-center'}>
      <Container style={{ minHeight: 350, width: 700 }} className={'shadow border'}>
        <Row className={''}>
          <Col md={5} style={{ backgroundColor: BTN_PRIMARY }} className={'d-flex flex-column align-items-center justify-content-evenly rounded'}>
            <h3 className={'text-white text-center'}>Welcome Evento App</h3>
            <img style={{ height: 150 }} src={security} alt="security" />
          </Col>
          <Col md={7} style={{ backgroundColor: CARD }} className={'p-5 rounded'}>
            <Form onSubmit={onSubmit} className='py-2'>
              <h3 className={'text-center'}>Register</h3>
              <Form.Group className={'my-3'}>
                <Form.Control
                  type={'text'}
                  name={'nombre'}
                  placeholder={'nombre de usuario'}
                  value={value.nombre}
                  onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                />
              </Form.Group>
              <Form.Group className={'my-3'}>
                <Form.Control
                  type={'email'}
                  name={'email'}
                  placeholder={'email'}
                  value={value.email}
                  onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                />
              </Form.Group>
              <Form.Group className={'my-3'}>
                <Form.Control
                  type={'password'}
                  name={'password'}
                  placeholder={'password'}
                  value={value.password}
                  onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                />
              </Form.Group>

              <Form.Group className={'my-3'}>
                <Button type={"submit"} variant="" style={{ backgroundColor: BTN_PRIMARY }} className={'w-100 text-white'}>
                  register
                </Button>
              </Form.Group>

              <Form.Group className={'my-3'}>
                <p className={"text-center"}>
                  <Link className={"text-center"} to={"/auth/login"}>¿Ya tienes una cuenta? Login</Link>
                </p>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default RegisterUserPage