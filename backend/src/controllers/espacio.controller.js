import prisma from "../config/prisma";


export const addEspacio = async (req, res) => {
    try {
        const newEspacio = req.body;
        const espacio = await prisma.espacio.create({
            data: newEspacio
        })
        res.json(espacio)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export const getEspacios = async (req, res) => {
    try {
        const { id } = req.params
        const espacios = await prisma.espacio.findMany({
            where: {
                sectorId: Number(id)
            }
        })
        res.json(espacios)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const getEspacio = async (req, res) => {
    try {
        const { id } = req.params
        const espacios = await prisma.espacio.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(espacios)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}