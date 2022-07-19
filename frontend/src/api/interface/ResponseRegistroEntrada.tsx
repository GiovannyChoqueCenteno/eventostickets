export interface RegistroEntrada {
    encargado: string;
    fecha:     Date;
    entrada:   Entrada;
}

interface Entrada {
    id:        number;
    evento:    string;
    sector:    string;
    espacio:   string;
    detalleId: number;
}
