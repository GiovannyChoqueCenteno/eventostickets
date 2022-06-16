import React from 'react'
import { Container, Form } from 'react-bootstrap'
import useForm from '../../../../../hook/useForm';
import { useLoadCategoria } from '../../../../../hook/useLoadCategoria';

interface Props {
    search: (name: string) => void;
    filterCategoria: (idCategoria: number) => void;
}

const Search = (props: Props) => {

    const { search, filterCategoria } = props;
    const { categoria } = useLoadCategoria();
    const { onChangeSelect } = useForm({
        categoria: "0"
    });
    const Search = (e: React.FormEvent<HTMLInputElement>) => {
        search(e.currentTarget.value);
    }
    const FilterCategoria = (e: React.FormEvent<HTMLSelectElement>) => {
        filterCategoria(Number(e.currentTarget.value));
        onChangeSelect(e, "categoria");
    }

    return (
        <Container>
            <Form className={'row'}>
                <Form.Group className={'col-md-10'}>
                    <Form.Label>Buscar Evento</Form.Label>
                    <Form.Control
                        name={'search'}
                        onChange={(e) => Search(e as React.FormEvent<HTMLInputElement>)}
                        placeholder={'nombre evento....'}
                    />
                </Form.Group>
                <Form.Group className={'col-md-2'}>
                    <Form.Label>Categoria Evento</Form.Label>
                    <Form.Select name={"categoria"} onChange={(e: React.FormEvent<HTMLSelectElement>) => FilterCategoria(e)}>
                        <option value={0}>Todas</option>
                        {
                            categoria.map((c) => (
                                <option value={c.id} key={c.id}>{c.nombre}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Search