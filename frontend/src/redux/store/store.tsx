import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import eventoSlice from "../slice/eventoSlice";
import usuarioSlice from "../slice/usuarioSlice";

const store = configureStore({
    reducer: {
        evento: eventoSlice,
        usuario: usuarioSlice,
        cart: cartSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;