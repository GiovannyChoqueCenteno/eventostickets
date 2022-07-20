import React, { useEffect, useState } from 'react'
import apiBackend from '../api/apiBackend';
import { Factura } from '../api/model/Factura';

interface Args {
    usuarioId: number
}

const useFactura = (args: Args) => {

    const [facturas, setfacturas] = useState<Factura[]>([] as Factura[]);
    const { usuarioId } = args;

    const getMyBill = async () => {
        try {
            const response = await apiBackend.get<Factura[]>(`/factura/usuario/${usuarioId}`);
            setfacturas(response.data);
        } catch (error) {
            console.log("getMyBill error : " + error);
        }
    }
    useEffect(() => {
        getMyBill();
    }, []);

    return {
        facturas
    }
}

export default useFactura