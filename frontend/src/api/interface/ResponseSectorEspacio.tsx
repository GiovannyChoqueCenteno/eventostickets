import { Espacio } from "../model/Espacio";

export interface ResponseSectorEspacio {
    id: number;
    nombre: string;
    capacidad: number;
    lugarId: number;
    espacio: Espacio[];
}

// export interface Espacio {
//     id:          number;
//     nombre:      string;
//     descripcion: string;
//     cantidad:    number;
//     capacidad:   number;
//     sectorId:    number;
// }
