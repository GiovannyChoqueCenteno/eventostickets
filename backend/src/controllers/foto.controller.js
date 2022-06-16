import prisma from "../config/prisma";
import upload from '../config/multer'
import path from 'path';

export const addFoto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        const { eventoId } = req.body
        const foto = await prisma.foto.create({
            data: {
                eventoId: Number(eventoId),
                fileName: req.file.originalname,
            }
        }
        )
        return res.status(200).send(foto)
    }
    )
}


export const getFotosByEvento = async (req, res) => {
    try {
        const { id } = req.params
        const fotos = await prisma.foto.findMany({
            where: {
                eventoId: Number(id)
            }
        }
        )
        res.json(fotos)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const getFotoName = async (req, res) => {
    try {
        const { fileName } = req.params
        res.sendfile(path.join('public', `/${fileName}`));
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const getFotosFirtEvento = async (req, res) => {
    try {
        const { id } = req.params
        const foto = await prisma.foto.findFirst({
            where: {
                eventoId: Number(id)
            }
        }
        )
        res.sendfile(path.join('public', `/${foto.fileName}`));
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}