import { createAsyncThunk } from '@reduxjs/toolkit'
import apiBackend from '../../api/apiBackend';
import { Evento } from '../../api/model/Evento';
import { Sector } from '../../api/model/Sector';
import { Espacio } from '../../api/model/Espacio';
import { Evento as StateEvento } from '../interface/evento';

import { Foto } from '../../api/model/Foto';
import { DataSource } from '../interface/evento';
import { Lugar } from '../../api/model/Lugar';
import { Horario } from '../../api/model/Horario';

type argsEvento = {
    titulo: string;
    descripcion: string;
    organizador: string;
    categoriaId: string;
}
export const eventoCreate = createAsyncThunk('evento/create', async (args: argsEvento, thunkApi) => {
    let body = { ...args, categoriaId: Number.parseInt(args.categoriaId), estadoId: 2 }
    try {
        let response = await apiBackend.post<Evento>('/evento', body);
        if (response.status !== 200) {
            alert("eventoCreate: Error Response");
            return {} as Evento;
        }
        return response.data;
    } catch (error) {
        alert("eventoCreate:Error Server");
        console.log(`eventoCreate: ${error}`);
        return {} as Evento;
    }
});


type argsImage = {
    images: DataSource[]
}

export const imageUpload = createAsyncThunk('/image/upload', async (args: argsImage, thunkApi) => {
    try {
        let error = false;
        let fotos: Foto[] = [];
        let { evento } = thunkApi.getState() as { evento: StateEvento };
        let eventoId = evento.id;
        for (let index = 0; index < args.images.length; index++) {
            const foto = args.images[index];
            let formData = new FormData();
            formData.append('file', foto.file);
            formData.append('eventoId', `${eventoId}`);
            let response = await apiBackend.post<Foto>('/foto', formData);
            if (response.status !== 200)
                error = true;
            else
                fotos.push(response.data);
        }
        if (error) alert("imageUpload: Error Response");
        return fotos;
    } catch (error) {
        alert("eventoCreate:Error Server");
        console.log(`imageUpload: ${error}`);
        return [];
    }
});

type argsLugar = {
    nombre: string;
    direccion: string;
    longitud: string;
    latitud: string;
    capacidad: string;
}

export const createLugar = createAsyncThunk('/lugar/create', async (args: argsLugar[], thunkApi) => {
    try {
        let { evento } = thunkApi.getState() as { evento: StateEvento };
        let eventoId = evento.id;
        let error = false;
        let lugares: Lugar[] = [];
        for (let index = 0; index < args.length; index++) {
            const lugar = args[index];
            let body = {
                ...lugar,
                longitud: `${lugar.longitud}`,
                latitud: `${lugar.latitud}`,
                capacidad: Number.parseInt(lugar.capacidad),
                eventoId
            };
            let response = await apiBackend.post<Lugar>('/lugar', body);
            if (response.status !== 200)
                error = true;
            else
                lugares.push(response.data);
        }
        if (error) alert("createLugar: Error Response");
        return lugares;
    } catch (error) {
        alert("createLugar:Error Server");
        console.log(`createLugar: ${error}`);
        return [];
    }
});

type argsHorario = {
    fecha: string;
    duracion: string;
    id_lugar: number;
}

export const createHorario = createAsyncThunk('/horario/create', async (args: argsHorario[], thunkApi) => {
    try {
        let error = false;
        let horarios: Horario[] = [];
        for (let index = 0; index < args.length; index++) {
            const horario = args[index];
            let body = {
                fecha: horario.fecha,
                duracion: Number.parseInt(horario.duracion),
                lugarId: Number(horario.id_lugar)
            }
            let response = await apiBackend.post<Horario>('/horario', body);
            if (response.status !== 200)
                error = true;
            else
                horarios.push(response.data);
        }
        if (error) alert("createHorario: Error Response");
        return horarios;
    } catch (error) {
        alert("createHorario:Error Server");
        console.log(`createHorario: ${error}`);
        return [];
    }
});

type argsSector = {
    nombre: string;
    capacidad: number;
    id_lugar: number;
}
export const createSector = createAsyncThunk('/sector/create', async (args: argsSector[], thunkApi) => {
    try {
        let error = false;
        let sectores: Sector[] = [];
        for (let index = 0; index < args.length; index++) {
            const sector = args[index];
            let body = {
                nombre: sector.nombre,
                capacidad: Number(sector.capacidad),
                lugarId: Number(sector.id_lugar)
            }
            let response = await apiBackend.post<Sector>('/sector', body);
            if (response.status !== 200)
                error = true;
            else
                sectores.push(response.data);
        }
        if (error) alert("createSector: Error Response");
        return sectores;
    } catch (error) {
        alert("createSector:Error Server");
        console.log(`createSector: ${error}`);
        return [];
    }
});

type argsEspacio = {
    nombre: string;
    descripcion: string;
    capacidad: number;
    cantidad: number;
    id_sector: number;
}

export const createEspacio = createAsyncThunk('/espacio/create', async (args: argsEspacio[], thunkApi) => {
    try {
        let error = false;
        let espacios: Espacio[] = [];
        for (let index = 0; index < args.length; index++) {
            const espacio = args[index];
            let body = {
                nombre: espacio.nombre,
                descripcion: espacio.descripcion,
                cantidad: Number(espacio.cantidad),
                capacidad: Number(espacio.capacidad),
                sectorId: Number(espacio.id_sector)
            }
            let response = await apiBackend.post<Espacio>('/espacio', body);
            if (response.status !== 200)
                error = true;
            else
                espacios.push(response.data);
        }
        if (error) alert("createEspacio: Error Response");
        return espacios;
    } catch (error) {
        alert("createEspacio:Error Server");
        console.log(`createEspacio: ${error}`);
        return [];
    }
});