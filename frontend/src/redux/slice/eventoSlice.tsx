import { createSlice } from "@reduxjs/toolkit";
import { Evento } from "../interface/evento";
import {
    eventoCreate, imageUpload, createLugar,
    createSector, createHorario, createEspacio
} from "../middleware/evento";

const evento: Evento = {
    id: 0,
    titulo: "",
    descripcion: "",
    organizador: "",
    categoriaId: 1,
    estadoId: 1,
    images: [],
    lugar: []
}

const eventoSlice = createSlice({
    name: "evento",
    initialState: evento,
    reducers: {
        clear: (state) => {
            state.id = 0;
            state.titulo = "";
            state.descripcion = "";
            state.organizador = "";
            state.categoriaId = 1;
            state.estadoId = 1;
            state.images = [];
            state.lugar = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(eventoCreate.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.titulo = action.payload.titulo;
            state.descripcion = action.payload.descripcion;
            state.organizador = action.payload.organizador;
            state.categoriaId = action.payload.categoriaId;
            state.estadoId = action.payload.estadoId;
        })
        builder.addCase(imageUpload.fulfilled, (state, action) => {
            state.images = action.payload;
        })
        builder.addCase(createLugar.fulfilled, (state, action) => {
            action.payload.forEach((lugar) => {
                state.lugar = [...state.lugar, {
                    ...lugar,
                    sector: [],
                    horario: []
                }];
            })
        })
        builder.addCase(createSector.fulfilled, (state, action) => {
            action.payload.forEach((sector) => {
                let lugares = state.lugar.map((lugar) => {
                    if (lugar.id === sector.lugarId)
                        lugar.sector = [...lugar.sector, { ...sector, espacio: [] }]
                    return lugar;
                })
                state.lugar = lugares;
            });
        })
        builder.addCase(createHorario.fulfilled, (state, action) => {
            action.payload.forEach((horario) => {
                let lugares = state.lugar.map((lugar) => {
                    if (lugar.id === horario.lugarId)
                        lugar.horario = [...lugar.horario, horario];
                    return lugar;
                });
                state.lugar = lugares;
            })
        })
        builder.addCase(createEspacio.fulfilled, (state, action) => {
            action.payload.forEach((espacio) => {
                let lugares = state.lugar.map((lugar) => {
                    let sectores = lugar.sector.map((sector) => {
                        if (sector.id === espacio.sectorId)
                            sector.espacio = [...sector.espacio, espacio]
                        return sector;
                    })
                    lugar.sector = sectores;
                    return lugar;
                });
                state.lugar = lugares;
            })
        })
    }
});

export const { actions: actionEvento } = eventoSlice;

export default eventoSlice.reducer;
