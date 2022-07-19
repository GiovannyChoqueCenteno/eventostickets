import React, { useState } from 'react'
import apiBackend from '../api/apiBackend';
import { Encargado, ResponseEncargados } from '../api/interface/ResponseEncargados'

const useEncargado = () => {

    const [encargados, setencargados] = useState<Encargado[]>([] as Encargado[]);
    const [encargadosEvent, setencargadosEvent] = useState<ResponseEncargados[]>([] as ResponseEncargados[]);


    const getAllEncargados = async () => {
        try {
            let response = await apiBackend.get<Encargado[]>(`/encargado`);
            let encargados = response.data;
            setencargados(encargados);
        } catch (e) {
            console.log("Error getAllEncargados :" + e);
        }
    }

    const getEncargadosEvent = async (eventoId: number) => {
        try {
            let response = await apiBackend.get<ResponseEncargados[]>(`/encargado/${eventoId}`);
            let encargadosEvent = response.data;
            setencargadosEvent(encargadosEvent);
        } catch (e) {
            console.log("Error getEncargadosEvent :" + e);
        }
    }

    const add = async (eventoId: number, encargado: Encargado) => {
        let exist = encargadosEvent.find((e) => e.encargado.id === encargado.id);
        if (exist !== undefined) return;
        try {
            let body = {
                eventoId,
                encargadoId: encargado.id
            }
            await apiBackend.post(`/encargado/add`, body);
            setencargadosEvent([...encargadosEvent, { eventoId, encargado }]);
        } catch (e) {
            console.log("Error add :" + e);
        }
    }

    const remove = async (eventoId: number, encargado: Encargado) => {
        let filter = encargadosEvent.filter((e) => e.encargado.id != encargado.id);
        let body = {
            eventoId,
            encargadoId: encargado.id
        }
        try {
            await apiBackend.delete('/encargado/delete', { data: body });
            setencargadosEvent(filter);
        } catch (e) {
            console.log("Error remove :" + e);
        }
    }

    return {
        getAllEncargados,
        getEncargadosEvent,
        add,
        remove,
        encargados,
        encargadosEvent
    }

}

export default useEncargado