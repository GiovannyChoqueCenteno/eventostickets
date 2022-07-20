const { PrismaClient } = require("@prisma/client");
const {
    categorias,
    estados,
    roles,
    usuarios,
    eventos,
    fotos,
    lugares,
    encargados,
    horarios,
    sectores,
    espacios
} = require("./data");

const prisma = new PrismaClient();

const destroy = async () => {
    try {
        await prisma.registro.deleteMany();
        await prisma.entrada.deleteMany();
        await prisma.detalleFactura.deleteMany();
        await prisma.espacio.deleteMany();
        await prisma.sector.deleteMany();
        await prisma.horario.deleteMany();
        await prisma.lugar.deleteMany();
        await prisma.encargadoEvento.deleteMany();
        await prisma.foto.deleteMany();
        await prisma.evento.deleteMany();
        await prisma.categoria.deleteMany();
        await prisma.estado.deleteMany();
        await prisma.factura.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.rol.deleteMany();
        console.log("Seed destroy OK");
    } catch (e) {
        console.log("Seed destroy: " + e);
    } finally {
        await prisma.$disconnect();
    }
};

const create = async () => {
    try {
        await prisma.rol.createMany({
            data: roles
        });
        await prisma.categoria.createMany({
            data: categorias
        });
        await prisma.estado.createMany({
            data: estados
        });
        await prisma.usuario.createMany({
            data: usuarios
        });
        await prisma.evento.createMany({
            data: eventos
        });
        await prisma.foto.createMany({
            data: fotos
        });
        await prisma.lugar.createMany({
            data: lugares
        });
        await prisma.encargadoEvento.createMany({
            data: encargados
        });
        await prisma.sector.createMany({
            data: sectores
        });
        await prisma.horario.createMany({
            data: horarios
        });
        await prisma.espacio.createMany({
            data: espacios
        });
        console.log("seed create OK");
    } catch (e) {
        console.log("Seed create:  " + e);
    } finally {
        await prisma.$disconnect();
    }
};

const execute = async () => {
    await destroy();
    await create();
}

execute();
