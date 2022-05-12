import { createSlice } from "@reduxjs/toolkit";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { Evento } from "../interface/evento";

const evento: Evento = {
    nombre: "",
    descripcion: "",
    organizador: "",
    categoria: -1,
    images: [],
    lugar: []
}

const eventoSlice = createSlice({
    name: "evento",
    initialState: evento,
    reducers: {
        addEvento: (state, action) => {
            state.nombre = action.payload.nombre;
            state.descripcion = action.payload.descripcion;
            state.organizador = action.payload.organizador;
            state.categoria = action.payload.categoria;
            state.images = action.payload.images;
        },
        addLugar: (state, action) => {
            state.lugar = action.payload;
        },
        addHorario: (state, action) => {
            let lugares = state.lugar.map((lugar) => {
                if (lugar.nombre === action.payload.lugar) {
                    lugar.horario = [...lugar.horario, {
                        fecha: action.payload.fecha,
                        hora: action.payload.hora,
                        duracion: action.payload.duracion,
                    }];
                }
                return lugar;
            });
            state.lugar = lugares;
        },
        addSector: (state, action) => {
            let lugares = state.lugar.map((lugar) => {
                if (lugar.nombre === action.payload.lugar) {
                    lugar.sector = [...lugar.sector, {
                        nombre: action.payload.nombre,
                        capacidad: action.payload.capacidad,
                        espacio: []
                    }];
                }
                return lugar;
            });
            state.lugar = lugares;
        },
        addEspacio: (state, action) => {

            let lugares = state.lugar.map((lugar) => {
                if (lugar.nombre === action.payload.lugar) {
                    let sectores = lugar.sector.map((sector) => {
                        if (sector.nombre === action.payload.sector) {
                            sector.espacio = [...sector.espacio, {
                                nombre: action.payload.nombre,
                                descripcion: action.payload.descripcion,
                                capacidad: action.payload.capacidad,
                                cantidad: action.payload.cantidad,
                            }]
                        }
                        return sector;
                    });
                    lugar.sector = sectores;
                }
                return lugar;
            });
            state.lugar = lugares;
        },
        deleteHorario: (state, action) => {
            let lugares = state.lugar.map((lugar) => {
                if (lugar.nombre === action.payload.lugar) {
                    let { fecha, hora } = action.payload;
                    let horarioFilter = lugar.horario.filter((h) => (h.fecha + h.hora !== fecha + hora))
                    lugar.horario = horarioFilter;
                }
                return lugar;
            });
            state.lugar = lugares;
        },
        deleteSector: (state, action) => {
            let lugares = state.lugar.map((lugar) => {
                if (lugar.nombre === action.payload.lugar) {
                    let sectores = lugar.sector.filter((sector) => sector.nombre !== action.payload.sector);
                    lugar.sector = sectores;
                }
                return lugar;
            });
            state.lugar = lugares;
        },
        deleteEspacio: (state, action) => {
            let lugares = state.lugar.map((lugar) => {
                if (lugar.nombre === action.payload.lugar) {
                    let sectores = lugar.sector.map((sector) => {
                        if (sector.nombre === action.payload.sector) {
                            let espacioFilter = sector.espacio.filter((espacio) => espacio.nombre !== action.payload.espacio);
                            sector.espacio = espacioFilter;
                        }
                        return sector;
                    });
                    lugar.sector = sectores;
                }
                return lugar;
            });
            state.lugar = lugares;
        },
        clearState: (state) => {
            state.nombre = "";
            state.descripcion = "";
            state.organizador = "";
            state.categoria = -1;
            state.images = [];
            state.lugar=[];
        }
    },
    extraReducers: (builder) => {
    }
});

export const { actions: actionEvento } = eventoSlice;

export default eventoSlice.reducer;
