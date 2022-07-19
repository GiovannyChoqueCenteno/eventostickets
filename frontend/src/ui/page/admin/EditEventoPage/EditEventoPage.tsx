import React from 'react'
import { Container, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import apiBackend from '../../../../api/apiBackend'
import { Evento } from '../../../../api/model/Evento'
import useForm from '../../../../hook/useForm'
import { useAppSelector } from '../../../../redux/store/config'
import { CARD, BTN_PRIMARY } from '../../../const/theme'

const EditEventoPage = () => {

    const location = useLocation();
    const { evento } = location.state as { evento: Evento };
    const usuario = useAppSelector((s) => s.usuario);
    const { onChange, value } = useForm({
        titulo: evento.titulo,
        organizador: evento.organizador,
        descripcion: evento.descripcion
    });

    const UpdateEvento = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await apiBackend.put(`/evento/${evento.id}`, { ...evento, ...value, adminId: usuario.id });
            alert("Se actualizo correctamente!!!");
        } catch (error) {
            alert("No se pudo actualizar !!!");
        }
    }

    return (
        <Container className={'mt-4 text-dark'}>
            <h4 className=''>Editar Evento</h4>
            <Container className={'rounded shadow p-4'} style={{ backgroundColor: CARD }}>
                <Form onSubmit={UpdateEvento} className={'row text-muted'}>
                    <Form.Group className={"col-md-6"}>
                        <Form.Label><small>Titulo</small></Form.Label>
                        <Form.Control
                            name={"titulo"}
                            type='text'
                            value={value.titulo}
                            onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                        />
                    </Form.Group>
                    <Form.Group className={"col-md-6"}>
                        <Form.Label><small>Organizador</small></Form.Label>
                        <Form.Control
                            name={"organizador"}
                            type='text'
                            value={value.organizador}
                            onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><small>descripcion</small></Form.Label>
                        <Form.Control
                            name={"descripcion"}
                            type='text'
                            value={value.descripcion}
                            onChange={(e) => onChange(e as React.FormEvent<HTMLInputElement>)}
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <button className={'btn text-white'} style={{ backgroundColor: BTN_PRIMARY }}>
                            Editar
                        </button>
                    </Form.Group>

                </Form>
            </Container>
        </Container>
    )
}

export default EditEventoPage