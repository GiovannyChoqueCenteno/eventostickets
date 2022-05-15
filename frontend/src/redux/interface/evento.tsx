
export interface DataSource {
    id: number;
    dataURL: string;
    file: File;
}

export interface Evento {
    id: string;
    titulo: string;
    descripcion: string;
    organizador: string;
    categoriaId: number;
    estadoId: number;
    images: DataSource[];
    lugar: Lugar[];
}

export interface Lugar {
    id: string;
    nombre: string;
    direccion: string;
    capacidad: number;
    longitud: string;
    latitud: string;
    horario: Horario[]
    sector: Sector[]
}

export interface Horario {
    id: string;
    fecha: string;
    hora: string;
    duracion: number
}

export interface Sector {
    id: string;
    nombre: string;
    capacidad: number;
    espacio: Espacio[]
}

export interface Espacio {
    id: string;
    nombre: string;
    descripcion: string;
    capacidad: number;
    cantidad: number;
}
