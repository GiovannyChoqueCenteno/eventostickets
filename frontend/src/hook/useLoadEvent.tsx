import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { ResponseAllEvento } from '../api/interface/ResponseAllEvent';

export const useLoadEvent = () => {
    const [evento, setevento] = useState<ResponseAllEvento[]>([] as ResponseAllEvento[]);
    const [loading, setloading] = useState<boolean>(true);

    const getAllCategoria = async () => {
        try {
            let response = await apiBackend.get<ResponseAllEvento[]>('/evento');
            let data = response.data;
            setevento(data);
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
        evento,
        loading
    }
}
