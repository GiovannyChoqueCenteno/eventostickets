export interface ResponseEncargados {
    eventoId: number;
    encargado: Encargado;
}

export interface Encargado {
    id: number;
    nombre: string;
    email: string;
}
