import prisma from "../config/prisma"

export const getEstados = async(req,res) =>{
    try {
        const estados = await prisma.estado.findMany()
        res.json(estados)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const addEstado = async(req,res)=>{
    try {
        const newEstado = req.body;
        const estado = await prisma.estado.create({
            data : newEstado
        })
        res.json(estado)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}