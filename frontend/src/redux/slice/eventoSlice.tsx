import { createSlice } from "@reduxjs/toolkit";
import { Evento } from "../interface/evento";

const evento: Evento = {
    id: "",
    titulo: "",
    descripcion: "",
    organizador: "",
    categoriaId: 1,
    estadoId: 1,
    images: [],
    lugar: [{
        id: "1",
        nombre: "Estadio SCZ",
        direccion: "",
        capacidad: 100,
        longitud: "",
        latitud: "",
        horario: [],
        sector: [{
            id: "2",
            nombre: "setco prueba",
            capacidad: 100,
            espacio: []
        }]
    },
    {
        id: "2",
        nombre: "Estadio LPZ",
        direccion: "",
        capacidad: 100,
        longitud: "",
        latitud: "",
        horario: [],
        sector: [
            {
                id: "3",
                nombre: "sector prueba2",
                capacidad: 100,
                espacio: []
            }
        ]
    }
    ]
}

const eventoSlice = createSlice({
    name: "evento",
    initialState: evento,
    reducers: {
    },
    extraReducers: (builder) => {
    }
});

export const { actions: actionEvento } = eventoSlice;

export default eventoSlice.reducer;
