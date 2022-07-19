import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { ResponseLugarHorario } from '../api/interface/ResponseLugarHorarios';

export const useCustomLugar = () => {

    const getLugarByEvent = async (eventoId: number): Promise<ResponseLugarHorario[] | null> => {
        try {
            let response = await apiBackend.get<ResponseLugarHorario[]>(`/lugar/${eventoId}`);
            return response.data;
        } catch (error) {
            console.log(`Error getLugarByEvent: ${error}`);
            return null;
        }
    }

    return {
        getLugarByEvent
    }
}