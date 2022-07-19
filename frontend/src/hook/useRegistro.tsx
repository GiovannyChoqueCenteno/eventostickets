import React from 'react'
import apiBackend from '../api/apiBackend'
import { RegistroEntrada } from '../api/interface/ResponseRegistroEntrada'

const useRegistro = () => {

    const getRegistroEntradasByLugar = async (lugarId: number): Promise<RegistroEntrada[] | null> => {
        try {
            let response = await apiBackend.get<RegistroEntrada[]>(`/entrada/registro/${lugarId}`);
            return response.data;
        } catch (error) {
            console.log(`Error getRegistroEntradasByLugar: ${error}`);
            return null;
        }
    }

    return {
        getRegistroEntradasByLugar
    }

}

export default useRegistro