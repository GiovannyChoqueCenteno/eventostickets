import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { ResponseAllCategoria } from '../api/interface/ResponseAllCategoria';

export const useLoadCategoria = () => {

    const [categoria, setcategoria] = useState<ResponseAllCategoria[]>([] as ResponseAllCategoria[]);
    const [loading, setloading] = useState<boolean>(true);

    const getAllCategoria = async () => {
        try {
            let response = await apiBackend.get<ResponseAllCategoria[]>('/categoria');
            let data = response.data;
            setcategoria(data);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategoria();
    }, []);

    return {
        loading,
        categoria
    }
}
