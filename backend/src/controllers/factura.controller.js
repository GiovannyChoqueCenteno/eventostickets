import prisma from "../config/prisma"


export const getFacturasByUser = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const facturas = await prisma.factura.findMany({
            where: {
                usuarioId: Number(usuarioId)
            }
        })
        res.json(facturas)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getFacturaById = async (req, res) => {
    const { id } = req.params
    try {
        const factura = await prisma.factura.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.json(factura)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const addFactura = async (req, res) => {
    try {
        const newFactura = req.body;
        const factura = await prisma.factura.create({
            data: newFactura,
        })
        res.json(factura)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const getFacturaWithDetalles = async (req, res) => {
    try {
        const { id } = req.params
        const facturas = await prisma.factura.findMany({
            where: {
                id: Number(id)
            },
            include: {
                detalles: true
            }
        })
        res.json(facturas)
    } catch (error) {
        res.status(500).send(error)
    }
}