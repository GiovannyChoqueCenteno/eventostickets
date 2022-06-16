import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiBackend from '../api/apiBackend';
import { ResponseDetalleBill } from '../api/interface/ResponseDetalleBill';
import { Detalle } from '../api/model/Detalle';
interface Args {
    facturaId: number;
}
const useDetalle = (args: Args) => {

    const { facturaId } = args;
    const navigate = useNavigate();
    const [detalle, setdetalle] = useState<Detalle[]>([] as Detalle[]);

    const getDetalleBill = async () => {
        try {
            const response = await apiBackend.get<ResponseDetalleBill[]>(`factura/detalle/${facturaId}`);
            console.log(`factura/detalle/${facturaId}`)
            let detalles = response.data[0].detalles;
            setdetalle(detalles);
        } catch (error) {
            console.log("Error getDetalleBill: " + error);
        }
    }

    useEffect(() => {
        getDetalleBill();
    }, []);

    return {
        detalle
    }

}

export default useDetalle