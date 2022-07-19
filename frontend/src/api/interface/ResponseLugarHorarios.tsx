import { Horario } from "../model/Horario";

export interface ResponseLugarHorario {
    id: number;
    nombre: string;
    direccion: string;
    longitud: string;
    latitud: string;
    capacidad: number;
    eventoId: number;
    horario: Horario[];
}