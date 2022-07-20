
import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { Espacio } from '../api/model/Espacio';

interface Args {
    espacioId: number
}

const useEspacio = (args: Args) => {
    const { espacioId } = args;
    const [espacio, setespacio] = useState<Espacio>({} as Espacio);

    const getEvento = async () => {
        try {
            const response = await apiBackend.get<Espacio>(`/espacio/one/${espacioId}`);
            setespacio(response.data);
        } catch (error) {
            console.log("Error getEvento: " + error);
        }
    }

    useEffect(() => {
        getEvento();
    }, []);

    return {
        espacio
    }
}

export default useEspacio