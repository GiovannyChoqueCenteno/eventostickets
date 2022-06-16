import prisma from "../config/prisma";

export const createEvento = async (req, res) => {
    try {
        console.log(req.body)
        const newEvento = req.body
        const evento = await prisma.evento.create({
            data: newEvento
        })
        res.json(evento)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const getEventos = async (req, res) => {
    try {
        const eventos = await prisma.evento.findMany()
        res.json(eventos)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const deleteEvento = async (req, res) => {
    try {
        const {id} = req.params
        const evento = await prisma.evento.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(evento)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const updateEvento = async (req, res) => {
    try {
        const {id} = req.params
        const updateEvento = req.body;
        const evento = await prisma.evento.update({
            where: {
                id: Number(id)
            },
            data: updateEvento
        })
        res.json(evento)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


export const getEventosDisponibles = async(req,res)=>{
    try {
        const eventos = await prisma.evento.findMany({
            where : {
                estadoId : 3
            },
            
        })
        res.json(eventos)
    } catch (error) {
        res.status(500).send(error);
    }
}