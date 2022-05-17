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

    const eliminar = async (idevento: number) => {
        try {
            let response = await apiBackend.delete(`/evento/${idevento}`);
            if (response.status !== 200) {
                alert("No se pudo eliminar response");
                return;
            }
            let eventoFilter = evento.filter((e) => e.id !== idevento);
            setevento(eventoFilter);
        } catch (error) {
            console.log(`useLoadEvent:eliminar ${error}`)
            alert("useLoadEvent:eliminar Error Server");
        }
    }

    useEffect(() => {
        getAllCategoria();
    }, []);

    return {
        evento,
        loading,
        eliminar
    }
}
