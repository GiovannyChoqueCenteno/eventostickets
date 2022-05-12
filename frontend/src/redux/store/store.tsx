import { configureStore } from "@reduxjs/toolkit";
import eventoSlice from "../slice/eventoSlice";

const store = configureStore({
    reducer: {
        evento: eventoSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;