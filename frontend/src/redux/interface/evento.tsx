
export interface DataSource {
    id: number;
    dataURL: string;
}

export interface Evento {
    nombre: string;
    categoria: number;
    organizador: string;
    descripcion: string;
    images: DataSource[];
    lugar: Lugar[];
}

export interface Lugar {
    nombre: string;
    direccion: string;
    capacidad: number;
    longitud: string;
    latitud: string;
    horario: Horario[]
    sector: Sector[]
}

export interface Horario {
    fecha: string;
    hora: string;
    duracion: number
}

export interface Sector {
    nombre: string;
    capacidad: number;
    espacio: Espacio[]
}

export interface Espacio {
    nombre: string;
    descripcion: string;
    capacidad: number;
    cantidad: number;
}
