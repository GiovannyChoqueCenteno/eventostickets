import { Foto } from "../../api/model/Foto";

export interface DataSource {
    id: number;
    dataURL: string;
    file: File;
}

export interface Evento {
    id: number;
    titulo: string;
    descripcion: string;
    organizador: string;
    categoriaId: number;
    estadoId: number;
    images: Foto[];
    lugar: Lugar[];
}

export interface Lugar {
    id: number;
    nombre: string;
    direccion: string;
    longitud: string;
    latitud: string;
    capacidad: number;
    eventoId: number;
    horario: Horario[]
    sector: Sector[]
}

export interface Horario {
    id: number;
    fecha: string;
    duracion: number
    lugarId: number;
}

export interface Sector {
    id: number;
    nombre: string;
    capacidad: number;
    lugarId: number;
    espacio: Espacio[]
}

export interface Espacio {
    id: number;
    nombre: string;
    descripcion: string;
    capacidad: number;
    cantidad: number;
}
