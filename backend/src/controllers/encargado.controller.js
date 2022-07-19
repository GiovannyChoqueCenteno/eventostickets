import prisma from "../config/prisma"

export const getEncargadoEvento = async (req, res) => {
    try {
        const { idEvento } = req.params
        const encargados = await prisma.encargadoEvento.findMany({
            where: {
                eventoId: Number(idEvento)
            },
            select: {
                eventoId: true,
                encargado: {
                    select: {
                        id: true,
                        nombre: true,
                        email: true,
                    }
                }
            }
        });
        res.json(encargados);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const getAllEncargado = async (req, res) => {
    try {
        const encargados = await prisma.usuario.findMany({
            where: {
                rolId: 2
            },
            select: {
                id: true,
                nombre: true,
                email: true
            }
        });
        res.json(encargados);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const addEncargado = async (req, res) => {
    try {
        const { eventoId, encargadoId } = req.body;
        const encargadoEvent = await prisma.encargadoEvento.create({
            data: {
                eventoId: Number(eventoId),
                encargadoId: Number(encargadoId)
            }
        })
        return res.json(encargadoEvent);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const deleteEncargado = async (req, res) => {
    try {
        const { eventoId, encargadoId } = req.body;
        const encargadoEvent = await prisma.encargadoEvento.deleteMany({
            where: {
                eventoId: Number(eventoId),
                encargadoId: Number(encargadoId)
            }
        })
        return res.json(encargadoEvent);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const eventosProximos = async (req , res ) => {
    try {
        const { idEncargado } = req.params;
        const eventos = await prisma.encargadoEvento.findMany({
            where: {
                encargadoId: Number(idEncargado),
            },
            select: {
                evento: {
                    select: {
                        id: true,
                        titulo: true,
                        descripcion: true,
                        organizador: true,
                        fotos : true,
                        lugares: {
                            include: {
                                horario: {
                                    where: {
                                        fecha: {
                                            gte: new Date(),
                                        },
                                    },
                                    select: {
                                        fecha: true,
                                        duracion: true,
                                    },
                                }
                            }
                        }
                    }
                }
            }
        });
        let eventosFilter = FilterEvents(eventos);
        res.status(200).json(eventosFilter);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const eventosPasados = async (req , res ) => {
    try {
        const { idEncargado } = req.params;
        const eventos = await prisma.encargadoEvento.findMany({
            where: {
                encargadoId: Number(idEncargado),
            },
            select: {
                evento: {
                    select: {
                        id: true,
                        titulo: true,
                        descripcion: true,
                        organizador: true,
                        lugares: {
                            include: {
                                horario: {
                                    where: {
                                        fecha: {
                                            lt: new Date(),
                                        },
                                    },
                                    select: {
                                        fecha: true,
                                        duracion: true,
                                    },
                                }
                            }
                        }
                    }
                }
            }
        });
        let eventosFilter = FilterEvents(eventos);
        return res.json(eventosFilter);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const FilterEvents = (eventos) => {
    let eventosFilter = [];
    eventos.forEach((dataE) => {
        let lugaresValidos = dataE.evento.lugares.filter((lugar) => {
            return (lugar.horario.length !== 0);
        });
        if (lugaresValidos.length > 0) {
            eventosFilter = [...eventosFilter, {
                ...dataE.evento,
                lugares: lugaresValidos
            }]
        }
    });
    return eventosFilter;
}