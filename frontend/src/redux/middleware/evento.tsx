import { createAsyncThunk } from '@reduxjs/toolkit'
import apiBackend from '../../api/apiBackend';
import { Evento } from '../../api/model/Evento';

interface args {
    titulo: string;
    descripcion: string;
    categoriaId: number;
    estadoId: number;
}

export const eventoCreate = createAsyncThunk('evento/create', async (args: args, thunkApi) => {
    try {
        let response = await apiBackend.post<Evento>('/', args);
        if (response.status === 200) {
            console.log("se creo el evento");
        } else {
            console.log("no se pudo crear el evento");
        }
    } catch (error) {
        console.log(error);
    }
});