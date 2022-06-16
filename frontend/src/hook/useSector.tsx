import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { ResponseSectorEspacio } from '../api/interface/ResponseSectorEspacio';

interface Args {
    lugarId: number
}

const useSector = (args: Args) => {

    const { lugarId } = args;
    const [sectorEspacio, setsectorEspacio] = useState<ResponseSectorEspacio[]>([] as ResponseSectorEspacio[]);

    const getSectorEspacio = async () => {
        try {
            let response = await apiBackend.get<ResponseSectorEspacio[]>(`/sector/${lugarId}`);
            setsectorEspacio(response.data);
        } catch (error) {
            console.log("Error getSectorEspacio " + error);
        }
    }

    useEffect(() => {
        getSectorEspacio();
    }, []);

    return {
        sectorEspacio
    }
}

export default useSector