import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { ResponseLugarHorario } from '../api/interface/ResponseLugarHorarios';

interface Args {
    eventId: number
}

const useLugar = (args: Args) => {

    const { eventId } = args;
    const [LugarHorario, setLugarHorario] = useState<ResponseLugarHorario[]>([] as ResponseLugarHorario[]);

    const getLugarHorario = async () => {
        try {
            const response = await apiBackend.get<ResponseLugarHorario[]>(`/lugar/${eventId}`);
            setLugarHorario(response.data);
        } catch (error) {
            console.log("Error getLugarHorario: " + error);
        }
    }

    useEffect(() => {
        getLugarHorario();
    }, []);

    return {
        LugarHorario
    }
}

export default useLugar