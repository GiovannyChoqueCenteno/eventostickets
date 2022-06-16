import prisma from "../config/prisma";

export const addEntrada = async (req, res) => {
    try {
        const newEntrada = req.body;
        const entrada = await prisma.entrada.create({
            data: newEntrada
        })
        res.json(entrada)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getEntradasByDetalle = async (req, res) => {
    const { detalleId } = req.params
    try {
        const entradas = await prisma.entrada.findMany({
            where: {
                detalleId: Number(detalleId)
            },
        })
        res.json(entradas)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getEntradaById = async (req, res) => {
    try {
        const { id } = req.params
        const entrada = await prisma.entrada.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.json(entrada)
    } catch (error) {
        res.status(500).send(error);
    }
}