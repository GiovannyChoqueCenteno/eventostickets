export type ImagePartial = {
    dataURL: string;
    file: File;
}

export type Lugar = {
    nombre: string;
    direccion: string;
    longitud: string;
    latitud: string;
    capacidad: number;
}

export type Horario = {
    fecha: string;
    hora: string;
    duracion: number;
    lugar: string;
    id_lugar: string;
}

export type Sector = {
    nombre: string;
    capacidad: number;
    id_lugar: string;
    lugar: string;
}

export type Espacio = {
    nombre: string,
    descripcion: string,
    capacidad: number,
    cantidad: number,
    sector: string,
    lugar: string,
    id_sector: string,
}

export type ErrorMap = {
    name: string;
    error: string;
}