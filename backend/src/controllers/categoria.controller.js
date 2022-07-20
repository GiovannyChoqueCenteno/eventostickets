import prisma from "../config/prisma"
import {validationResult} from "express-validator";


export const getCategorias = async (req, res) => {
    try {

        console.log("Obteniendos ")
        const categorias = await prisma.categoria.findMany()
        res.json(categorias)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const addCategoria = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const newCategoria = req.body;
        const categoria = await prisma.categoria.create({
            data: newCategoria
        })
        res.json(categoria)
    } catch (error) {
        res.json(error)
    }
}


export const updateCategoria = async (req, res) => {
    try {
        const {id} = req.params
        const categoria = await prisma.categoria.update({
            data: req.body,
            where: {
                id
            }
        })
        res.json(categoria)
    } catch (error) {
        res.status(500).send(error)
    }
}