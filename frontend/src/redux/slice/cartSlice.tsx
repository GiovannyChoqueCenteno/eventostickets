import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../interface/cart";

const intialState: Cart = {
    evento: "",
    lugar: "",
    fecha_valida: "",
    sector: "",
    espacio: "",
    cantidad: 0,
    espacioId: 0
}

const cartSlice = createSlice({
    name: "usuario",
    initialState: intialState,
    reducers: {
        addNameEvent: (state, action) => {
            state.evento = action.payload.evento;
        },
        addLugarHorario: (state, action) => {
            state.evento = state.evento;
            state.lugar = action.payload.lugar;
            state.fecha_valida = action.payload.fecha;
        },
        addSectorEspacio: (state, action) => {
            state.sector = action.payload.sector;
            state.espacio = action.payload.espacio;
            state.cantidad = action.payload.cantidad;
            state.espacioId = action.payload.espacioId;
        },
        clear: (state) => {
            state.evento = "";
            state.lugar = "";
            state.fecha_valida = "";
            state.sector = "";
            state.espacio = "";
            state.cantidad = 0;
            state.espacioId = 0;
        }
    }
});

export const { actions: actionCart } = cartSlice;
export default cartSlice.reducer;