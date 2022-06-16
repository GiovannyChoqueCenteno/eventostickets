import { createSlice } from "@reduxjs/toolkit";
import { Usuario } from "../interface/usuario";
import jwt_decode from 'jwt-decode';
import { UsuarioToken } from "../../api/model/UsuarioToken";
const intialState: Usuario = {
    id: 0,
    nombre: "",
    email: "",
    type: "",
    isAuthenticated: false
}

const usuarioSlice = createSlice({
    name: "usuario",
    initialState: intialState,
    reducers: {
        addUsuario: (state, action) => {
            let usuario: UsuarioToken = jwt_decode(action.payload.token);
            localStorage.setItem("_token", action.payload.token);
            state.id = usuario.id;
            state.nombre = usuario.nombre;
            state.isAuthenticated = true;
            state.type = usuario.rolId === 1 ? "cliente" : "admin";
            state.email = usuario.email;
        },
        logout: (state) => {
            state.id = 0;
            state.nombre = "";
            state.email = "";
            state.type = "";
            state.isAuthenticated = false;
            localStorage.removeItem("_token");
        }
    }
})

export const { actions: actionUsuario } = usuarioSlice;

export default usuarioSlice.reducer;