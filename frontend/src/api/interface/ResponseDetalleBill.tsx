import { Detalle } from "../model/Detalle";

export interface ResponseDetalleBill {
    id: number;
    fecha: Date;
    total: number;
    usuarioId: number;
    detalles: Detalle[];
}


