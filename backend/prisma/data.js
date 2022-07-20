const categorias = [
    {
        nombre: "Eventos Deportivos",
        descripcion: "Descripcion"
    },
    {
        nombre: "Conciertos",
        descripcion: "Descripcion"
    },
    {
        nombre: "Eventos Sociales",
        descripcion: "Descripcion"
    }
];

const estados = [
    {
        nombre: "Disponible",
        descripcion: "El evento esta disponible"
    },
    {
        nombre: "En preparacion",
        descripcion: "El evento esta en preparacion"
    },
    {
        nombre: "Cancelado",
        descripcion: "El evento se cancelo"
    }
];

const roles = [
    {
        descripcion: "Administrador"
    },
    {
        descripcion: "Encargado"
    },
    {
        descripcion: "Cliente"
    }
];

const usuarios = [
    {
        nombre: "Giovanny",
        email: "giovannyjchoquecenoteno@gmail.com",
        password: "$2b$10$cTTx2nAZuO3T1oSg3t00WOX/AaMt8UcCGX3tnFNOfVR1L6SFierRG",
        rolId: 1
    },
    {
        nombre: "Jose",
        email: "jose@gmail.com",
        password: "$2b$10$is9xi8UzWMeJfA1T84N1OeYneQK0oAzK4f50tArFjHbVPVMoFixw2",
        rolId: 1
    },
    {
        nombre: "Eduardo",
        email: "jorge.ecrg@gmail.com",
        password: "$2b$10$is9xi8UzWMeJfA1T84N1OeYneQK0oAzK4f50tArFjHbVPVMoFixw2",
        rolId: 3
    },
    {
        nombre: "David",
        email: "david@gmail.com",
        password: "$2b$10$is9xi8UzWMeJfA1T84N1OeYneQK0oAzK4f50tArFjHbVPVMoFixw2",
        rolId: 2
    },
    {
        nombre: "Juan",
        email: "juan@gmail.com",
        password: "$2b$10$is9xi8UzWMeJfA1T84N1OeYneQK0oAzK4f50tArFjHbVPVMoFixw2",
        rolId: 2
    }
];

const fotos = [
    {
        fileName: "img1.jpg",
        eventoId: 1,
    },
    {
        fileName: "img2.jpg",
        eventoId: 1,
    },
    {
        fileName: "img2.jpg",
        eventoId: 2,
    },
    {
        fileName: "img1.jpg",
        eventoId: 3,
    },
    {
        fileName: "img1.jpg",
        eventoId: 4,
    },
    {
        fileName: "img2.jpg",
        eventoId: 4,
    }
];

const eventos = [
    {
        titulo: "Angeles Azules",
        descripcion: "Los Angeles Azules",
        categoriaId: 2,
        estadoId: 1,
        adminId: 2,
        organizador: "Juan Perez",
    },
    {
        titulo: "Los Kjarkas",
        descripcion: "Los Kjarkas descripcion",
        categoriaId: 2,
        estadoId: 1,
        adminId: 2,
        organizador: "Juan Perez",
    },
    {
        titulo: "Competencia Deportiva",
        descripcion: "En el coliseo santa cruz",
        categoriaId: 1,
        estadoId: 1,
        adminId: 2,
        organizador: "Juan Sanchez",
    },
    {
        titulo: "Concierto Benefico",
        descripcion: "Concierto benefico sdjsh sjhdjshdjhjshd jshdj hajsd hakjsh dkahsdkhakshdkjashdkjhas dhk",
        categoriaId: 3,
        estadoId: 1,
        adminId: 2,
        organizador: "Juan Perez",
    }
];

const lugares = [
    {
        nombre: "Estadio Tauchi Aguilera",
        direccion: "Av nueva",
        longitud: "-62.99586384071861",
        latitud: "-17.755318123393447",
        capacidad: 2000,
        eventoId: 1,
    },
    {
        nombre: "Estadio Hernando Siles",
        direccion: "Av siles",
        longitud: "-63.195761",
        latitud: "-17.775001",
        capacidad: 2000,
        eventoId: 1,
    },
    {
        nombre: "Estadio Tauchi Aguilera",
        direccion: "Av nueva",
        longitud: "-62.99586384071861",
        latitud: "-17.755318123393447",
        capacidad: 2000,
        eventoId: 2,
    },
    {
        nombre: "Coliseo Santa Cruz",
        direccion: "Av coliseo",
        longitud: "-63.195761",
        latitud: "-17.775001",
        capacidad: 300,
        eventoId: 3,
    },
    {
        nombre: "Coliseo la Paz 1",
        direccion: "Av nueva 1",
        longitud: "-62.99586384071861",
        latitud: "-17.755318123393447",
        capacidad: 500,
        eventoId: 4,
    },
    {
        nombre: "Coliseo la Paz 2",
        direccion: "Av nueva 2",
        longitud: "-63.195761",
        latitud: "-17.775001",
        capacidad: 1000,
        eventoId: 4,
    }
];

const encargados = [
    {
        eventoId: 1,
        encargadoId: 4,
    },
    {
        eventoId: 2,
        encargadoId: 4,
    },
    {
        eventoId: 3,
        encargadoId: 5,
    },
    {
        eventoId: 4,
        encargadoId: 5,
    }
]

const horarios = [
    {
        fecha: new Date('2022-10-17 20:00:00'),
        duracion: 2,
        lugarId: 1,
    },
    {
        fecha: new Date('2022-10-24 20:00:00'),
        duracion: 2,
        lugarId: 1,
    },
    {
        fecha: new Date('2022-11-02 20:00:00'),
        duracion: 4,
        lugarId: 2,
    },
    {
        fecha: new Date('2022-11-10 20:00:00'),
        duracion: 4,
        lugarId: 2,
    },
    {
        fecha: new Date('2022-11-05 18:00:00'),
        duracion: 2,
        lugarId: 3,
    },
    {
        fecha: new Date('2022-11-13 08:00:00'),
        duracion: 2,
        lugarId: 3,
    },
    {
        fecha: new Date('2022-11-10 08:00:00'),
        duracion: 2,
        lugarId: 4,
    },
    {
        fecha: new Date('2022-10-10 21:00:00'),
        duracion: 3,
        lugarId: 5,
    },
    {
        fecha: new Date('2022-10-15 21:00:00'),
        duracion: 3,
        lugarId: 5,
    }, ,
    {
        fecha: new Date('2022-12-02 21:00:00'),
        duracion: 4,
        lugarId: 6,
    },
    {
        fecha: new Date('2022-12-07 21:00:00'),
        duracion: 3,
        lugarId: 6,
    },

];

const sectores = [
    {
        nombre: "Gral",
        capacidad: 1000,
        lugarId: 1,
    },
    {
        nombre: "Vip",
        capacidad: 1000,
        lugarId: 1,
    },
    {
        nombre: "Gral",
        capacidad: 1000,
        lugarId: 2,
    },
    {
        nombre: "Vip",
        capacidad: 1000,
        lugarId: 2,
    },
    {
        nombre: "Gral",
        capacidad: 1000,
        lugarId: 3,
    },
    {
        nombre: "Vip",
        capacidad: 1000,
        lugarId: 3,
    },
    {
        nombre: "Gral",
        capacidad: 300,
        lugarId: 4,
    },
    {
        nombre: "Gral",
        capacidad: 600,
        lugarId: 5,
    },
    {
        nombre: "Gral",
        capacidad: 500,
        lugarId: 6,
    },
    {
        nombre: "Vip",
        capacidad: 500,
        lugarId: 6,
    },
];

const espacios = [
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Asiento",
        cantidad: 1000,
        capacidad: 1,
        precio: 100,
        disponible: 1000,
        sectorId: 1,
    },
    {
        nombre: "Mesa",
        descripcion: "Descripcion de Mesa",
        cantidad: 1000,
        capacidad: 3,
        precio: 250,
        disponible: 1000,
        sectorId: 2,
    },
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Asiento",
        cantidad: 1000,
        capacidad: 1,
        precio: 100,
        disponible: 1000,
        sectorId: 3,
    },
    {
        nombre: "Mesa",
        descripcion: "Descripcion de Mesa",
        cantidad: 1000,
        capacidad: 3,
        precio: 250,
        disponible: 1000,
        sectorId: 4,
    },
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Asiento",
        cantidad: 1000,
        capacidad: 1,
        precio: 100,
        disponible: 1000,
        sectorId: 5,
    },
    {
        nombre: "Mesa",
        descripcion: "Descripcion de Asiento",
        cantidad: 1000,
        capacidad: 3,
        precio: 250,
        disponible: 1000,
        sectorId: 6,
    },
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Asiento",
        cantidad: 300,
        capacidad: 1,
        precio: 100,
        disponible: 300,
        sectorId: 7,
    },
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Mesa",
        cantidad: 500,
        capacidad: 1,
        precio: 100,
        disponible: 500,
        sectorId: 8,
    },
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Asiento",
        cantidad: 500,
        capacidad: 1,
        precio: 100,
        disponible: 500,
        sectorId: 9,
    },
    {
        nombre: "Asiento",
        descripcion: "Descripcion de Asiento",
        cantidad: 300,
        capacidad: 1,
        precio: 150,
        disponible: 300,
        sectorId: 10,
    },
    {
        nombre: "Mesa",
        descripcion: "Descripcion de Mesa",
        cantidad: 200,
        capacidad: 3,
        precio: 250,
        disponible: 200,
        sectorId: 10,
    },
];

module.exports = {
    categorias,
    estados,
    roles,
    usuarios,
    fotos,
    eventos,
    lugares,
    encargados,
    horarios,
    sectores,
    espacios
}