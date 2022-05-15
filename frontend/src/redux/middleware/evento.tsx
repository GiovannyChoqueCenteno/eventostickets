import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataSource } from '../interface/evento';

type argsEvento = {
    titulo: string;
    descripcion: string;
    organizador: string;
    categoriaId: number;
}

export const eventoCreate = createAsyncThunk('evento/create', async (args: argsEvento, thunkApi) => {
    try {
        console.log("ok:eventoCreate");
        console.log(args);
    } catch (error) {
        console.log(error);
    }
});


type argsImage = {
    images: DataSource[]
}

export const imageUpload = createAsyncThunk('/image/upload', async (args: argsImage, thunkApi) => {
    try {
        console.log("ok:imageUpload");
        console.log(args);
    } catch (error) {
        console.log(error);
    }
});

type argsLugar = {
    nombre: string;
    direccion: string;
    longitud: string;
    latitud: string;
    capacidad: number;
}

export const createLugar = createAsyncThunk('/lugar/create', async (args: argsLugar[], thunkApi) => {
    try {
        console.log("ok:createLugar");
        console.log(args);
    } catch (error) {
        console.log(error);
    }
});

type argsHorario = {
    fecha: string;
    hora: string;
    duracion: number;
    id_lugar: string;
}

export const createHorario = createAsyncThunk('/horario/create', async (args: argsHorario[], thunkApi) => {
    try {
        console.log("ok:createHorario");
        console.log(args);
    } catch (error) {
        console.log(error);
    }
});

type argsSector = {
    nombre: string;
    capacidad: number;
    id_lugar: string;
}

export const createSector = createAsyncThunk('/sector/create', (args: argsSector[], thunkApi) => {
    try {
        console.log("ok:createSector");
        console.log(args);
    } catch (error) {
        console.log(error);
    }
});

type argsEspacio = {
    nombre: string;
    descripcion: string;
    capacidad: number;
    cantidad: number;
    id_sector: string;
}

export const createEspacio = createAsyncThunk('/espacio/create', (args: argsEspacio[], thunkApi) => {
    try {
        console.log("ok:createSector");
        console.log(args);
    } catch (error) {
        console.log(error);
    }
});