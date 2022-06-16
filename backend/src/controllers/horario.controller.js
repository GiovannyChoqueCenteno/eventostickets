import prisma from "../config/prisma";


export const addHorario = async (req, res) => {
    try {
        const newHorario = req.body
        const fecha = new Date(newHorario.fecha)
        const horario = await prisma.horario.create({
            data: {
                ...newHorario,
                fecha
            }
        })

        res.json(horario)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// getHorariosByEvento
export const getHorariosByLugar = async (req, res) => {
    try {
        const { id } = req.params
        const horarios = await prisma.horario.findMany({
            where: {
                lugarId: Number(id)
            }
        })
        res.json(horarios)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 