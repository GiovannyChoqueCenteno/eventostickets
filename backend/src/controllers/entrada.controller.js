import { request, response } from "express";
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
export const getEntradaByCodigo = async (req, res) => {
    try {
        const { codigo} = req.params
        const entrada = await prisma.entrada.findFirst({
            select : {
                id : true,
                registro : {
                    select : {
                        id : true
                    }
                } 
            },
            where: {
                codigo : codigo
            }
        })
        res.json(entrada)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
export const registrarEntrada = async (req = request, res = response) => {
    try {

        const { entradaId, encargado, encargadoId, lugarId } = req.body;
        console.log(lugarId);
        const exist = await prisma.registro.findFirst({
            where: {
                entradaId: Number(entradaId)
            }
        });

        if (exist) {
            return res.json({
                ok: false,
                message: "La entrada ya ha sido registrada",
                data: exist
            });
        }

        const registro = await prisma.registro.create({
            data: {
                encargado: encargado,
                fecha: new Date(),
                entradaId: Number(entradaId),
                encargadoId: Number(encargadoId),
                idlugar:Number(lugarId)
            }
        });

        return res.json({
            ok: true,
            message: "La entrada se registro correctamente!!!",
            data: registro
        });

    } catch (error) {
        console.log(`registrarEntrada :${error}`);
        res.status(500).send(error);
    }
}

// MIgrations add campo idlugar
export const getEntradasCompradas = async (req = request, res = response) => {
    try {
        const { lugarId } = req.params;
        const registros = await prisma.registro.findMany({
            where: {
                idlugar:Number(lugarId)
            },
            select: {
                encargado: true,
                fecha: true,
                entrada: true
            }
        });
        res.json(registros);
    } catch (error) {
        console.log(`getEntradasCompradas :${error}`);
        res.status(500).send(error);
    }
}