export type ImagePartial = {
    dataURL: string;
    file: File;
}
export type Evento = {
    titulo: string;
    descripcion: string;
    categoriaId: string;
    organizador: string;
}

export type Lugar = {
    nombre: string;
    direccion: string;
    longitud: string;
    latitud: string;
    capacidad: string;
}

export type Horario = {
    fecha: string;
    duracion: string;
    lugar: string;
    id_lugar: number;
}

export type Sector = {
    nombre: string;
    capacidad: number;
    id_lugar: number;
    lugar: string;
}

export type Espacio = {
    nombre: string,
    descripcion: string,
    capacidad: number,
    cantidad: number,
    sector: string,
    lugar: string,
    id_sector: number,
    precio: number
}

export type ErrorMap = {
    name: string;
    error: string;
}