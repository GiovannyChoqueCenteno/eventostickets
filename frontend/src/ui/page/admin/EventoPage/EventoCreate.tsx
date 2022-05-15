import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { RMIUploader } from 'react-multiple-image-uploader';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/config';

import useForm from '../../../../hook/useForm';
import { BTN_PRIMARY, CARD } from '../../../const/theme';
import { DataSource } from '../../../../redux/interface/evento';
import { ErrorMap, ImagePartial } from './interface/interface';
import { schemaEvento } from './validacion/schemaEvento';
import { actionEvento } from '../../../../redux/slice/eventoSlice';
import { useLoadCategoria } from '../../../../hook/useLoadCategoria';
import { eventoCreate, imageUpload } from '../../../../redux/middleware/evento';
interface Props {
    setstep: Dispatch<SetStateAction<number>>;
}
const EventoCreate = (props: Props) => {

    const { setstep } = props;
    const dispatch = useAppDispatch();
    const { categoria, loading } = useLoadCategoria();
    const [dataSource, setdataSource] = useState<DataSource[]>([] as DataSource[]);
    const [countImage, setcountImage] = useState<number>(0);
    const [errors, seterrors] = useState<ErrorMap>({} as ErrorMap);

    const { value, onChange, onChangeSelect, setField } = useForm({
        titulo: "",
        descripcion: "",
        organizador: "",
        categoriaId: 1,
    });

    const Onchange = (e: React.FormEvent<HTMLInputElement>) => {
        validarCampos();
        onChange(e);
    }

    const validarCampos = () => {
        seterrors({
            name: "",
            error: ""
        });
        schemaEvento.validate(value).catch((err) => {
            seterrors({
                ...errors,
                name: err.path,
                error: err.errors[0],
            });
        });
    }

    const onUpload = (data: ImagePartial[]) => {
        let idImage = countImage;
        let images = data.map((image) => {
            idImage++;
            return { id: idImage, dataURL: image.dataURL, file: image.file }
        });
        setcountImage(idImage);
        setdataSource((d) => [...d, ...images]);
        validarCampos();
    };

    const onSelect = (data: any) => {
        console.log("Select files", data);
    };

    const onRemove = (id: number) => {
        let data = dataSource;
        let filterImage = data.filter((image) => image.id !== id);
        setdataSource(filterImage);
        validarCampos();
    };

    const save = () => {
        validarCampos();
        schemaEvento.validate(value).then(async () => {
            if (dataSource.length > 0) {
                await dispatch(eventoCreate(value));
                await dispatch(imageUpload({ images: dataSource }));
                setstep((next) => next + 1);
            }
        });
    }

    useEffect(() => {
        categoria.length > 0 && setField('categoriaId', categoria[0].id);
    }, [categoria])

    return (
        <Container style={{ backgroundColor: CARD }}>
            <h5 className='text-muted'>Crear Evento</h5>
            <Form className='row text-muted'>
                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Titulo</small></Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'ed...'}
                        name={'titulo'}
                        value={value.titulo}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        autoComplete="off"
                    />
                    <Form.Text className="text-danger">{errors.name === "titulo" && errors.error}</Form.Text>
                </Form.Group>
                <Form.Group className={'col-md-6'}>
                    <Form.Label><small>Categoria</small></Form.Label>
                    <Form.Select
                        name={'categoriaId'}
                        onChange={(e) => onChangeSelect(e as React.FormEvent<HTMLSelectElement>, 'categoriaId')}
                        value={value.categoriaId}
                    >
                        {
                            (!loading) &&
                            categoria.map((c) => (
                                <option
                                    key={c.id}
                                    value={c.id}>{c.nombre}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className={'col-md-12'}>
                    <Form.Label><small>Organizador del evento</small></Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'...'}
                        name={'organizador'}
                        value={value.organizador}
                        autoComplete={"off"}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Form.Text className="text-danger">{errors.name === "organizador" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-12'}>
                    <Form.Label><small>Descripcion</small></Form.Label>
                    <Form.Control
                        type='text'
                        name='descripcion'
                        value={value.descripcion}
                        onChange={(e) => Onchange(e as React.FormEvent<HTMLInputElement>)}
                        as="textarea" placeholder="...."
                    />
                    <Form.Text className="text-danger">{errors.name === "descripcion" && errors.error}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-12'}>
                    <Form.Label><small>Subir imagenes</small></Form.Label>
                    <RMIUploader
                        dataSources={dataSource}
                        onRemove={onRemove}
                        onSelect={onSelect}
                        onUpload={onUpload}
                        warnMessage={"warning message"}
                    />
                    <Form.Text className="text-danger">{dataSource.length === 0 && "se debe agregar por lo menos una imagen"}</Form.Text>
                </Form.Group>

                <Form.Group className={'col-md-6 my-3'}>
                    <Button onClick={save} variant={""} className={'text-white mb-3'} style={{ backgroundColor: BTN_PRIMARY }}>next</Button>
                </Form.Group>

            </Form>
        </Container>
    )
}

export default EventoCreate