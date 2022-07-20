import path from 'path'

import prisma from "../../config/prisma";
import { generarQR } from '../correo/qr';
import { mandarEmail } from '../correo/nodemailer';

export const getDetail = async (id) => {
    try {
        const detail = await prisma.detalleFactura.findFirst({
            where: {
                id
            },
            select: {
                cantidad: true,
                id: true,
                entradas: {
                    select: {
                        id: true
                    }
                },
                factura: {
                    select: {
                        usuario: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
                espacio: {
                    select: {
                        capacidad: true,
                        descripcion: true,
                        sector: {
                            select: {
                                nombre: true,
                                lugar: {
                                    select: {
                                        id: true,
                                        direccion: true,
                                        evento: {
                                            select: {
                                                id: true,
                                                titulo: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        })
        return detail

    } catch (error) {
        return error;
    }
}
export const mandarEntradas = async (id) => {
    setTimeout(async() => {
        console.log("mandarEntradas")
        const detalle = await getDetail(id)
        const longitud = detalle.cantidad * detalle.espacio.capacidad;
        const array = Array.from(Array(longitud).keys())
        const attachments = []
        array.forEach((index) => {
            attachments.push({
                filename: `Entrada ${index + 1}`,
                path: `${path.join(__dirname, '../../../pdf', `${detalle.id}${index}.pdf`)}`,
                contentType: 'application/pdf'
            })
            generarQR(detalle, index)
        })        

        setTimeout(() => {
            mandarEmail(detalle.factura.usuario.email, attachments)
        }, 10000)

    }, 3000);

}