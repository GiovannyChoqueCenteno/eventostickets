import React, { useEffect, useState } from 'react'
import { Foto } from '../api/model/Foto'
import apiBackend from '../api/apiBackend'

interface Args {
    eventId: number
}

const useFoto = (args: Args) => {

    const { eventId } = args;
    const [fotos, setfotos] = useState<Foto[]>([] as Foto[]);

    const getFotoByEvent = async () => {
        try {
            const response = await apiBackend.get<Foto[]>(`/foto/${eventId}`);
            setfotos(response.data);
        } catch (error) {
            console.log(`Error getFotoByEvent : ${error}`)
        }
    }

    useEffect(() => {
        getFotoByEvent();
    }, []);

    return {
        fotos
    }
}

export default useFoto