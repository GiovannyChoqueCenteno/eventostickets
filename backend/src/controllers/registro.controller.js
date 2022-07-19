import prisma from "../config/prisma"

export const addRegistro = async(req , res)=>{
    try {
        const addregistro = req.body
        const registro = await prisma.registro.create({
            data : addregistro
        })
        res.json(registro)
    } catch (error) {
        res.send(error)
    }
}