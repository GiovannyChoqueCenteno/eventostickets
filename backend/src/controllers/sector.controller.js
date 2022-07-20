import prisma from '../config/prisma'


export const addSector = async (req, res) => {
    try {
        const newSector = req.body
        const sector = await prisma.sector.create({
            data: newSector
        })
        res.json(sector)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
export const getSectoresByLugar = async (req, res) => {
    try {
        const { id } = req.params
        const sectores = await prisma.sector.findMany({
            where: {
                lugarId: Number(id)
            },
            include: {
                espacio: true
            }
        })
        res.json(sectores)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}