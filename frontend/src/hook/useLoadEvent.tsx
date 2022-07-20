import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { Evento } from '../api/model/Evento';
import { useAppSelector } from '../redux/store/config';

export const useLoadEvent = () => {
    const [evento, setevento] = useState<Evento[]>([] as Evento[]);
    const [eventoFilter, seteventoFilter] = useState<Evento[]>([] as Evento[]);
    const [loading, setloading] = useState<boolean>(true);
    const usuario = useAppSelector((s) => s.usuario);

    const getAllEvent = async () => {
        try {
            let response = await apiBackend.get<Evento[]>(`/evento`);
            let data = response.data;
            setevento(data);
            seteventoFilter(data);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.log(error);
        }
    }

    const getMyEvent = async () => {
        try {
            let response = await apiBackend.get<Evento[]>(`/evento/admin/${usuario.id}`);
            let data = response.data;
            setevento(data);
            seteventoFilter(data);
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
            let eventosFiltrados = eventoFilter.filter((e) => e.id !== idevento);
            seteventoFilter(eventosFiltrados);
            setevento(eventosFiltrados);
        } catch (error) {
            console.log(`useLoadEvent:eliminar ${error}`)
            alert("useLoadEvent:eliminar Error Server");
        }
    }

    const search = (name: string) => {
        if (name.length === 0) {
            seteventoFilter(evento);
            return;
        }
        let eventosSearch = eventoFilter.filter((e) => e.titulo.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        seteventoFilter(eventosSearch);
    }

    const filterCategoria = (id: number) => {
        if (id === 0) {
            seteventoFilter(evento);
            return;
        }
        let eventoFilterCategoria = evento.filter((e) => {
            console.log(e.categoriaId);
            if (e.categoriaId === id) return true;
            return false;
        });
        seteventoFilter(eventoFilterCategoria);
    }
   
    return {
        evento,
        eventoFilter,
        loading,
        eliminar,
        search,
        filterCategoria,
        getAllEvent,
        getMyEvent
    }
}
