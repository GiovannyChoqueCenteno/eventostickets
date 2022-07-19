import prisma from "../config/prisma";
import { mandarEntradas } from "../utils/entrada/entrada.util";
export const addDetalleFactura = async (req, res) => {
    try {
        const newDetalle = req.body;
        const detalle = await prisma.detalleFactura.create({
            data: newDetalle
        })
        console.log(detalle)
        mandarEntradas(detalle.id)
        res.json(detalle)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const getDetallesByFactura = async (req, res) => {
    try {
        const detalles = await prisma.detalleFactura.findMany();
        res.json(detalles)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getDetalleById = async (req, res) => {
    try {
        const { id } = req.params.id;
        const detalle = await prisma.detalleFactura.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                espacio: {
                    include: {
                        sector: {

                        }
                    }
                }
            }
        })
        res.json(detalle)
    } catch (error) {
        res.status(500).send(error)
    }
}