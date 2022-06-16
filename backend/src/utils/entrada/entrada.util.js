import path from 'path'

import prisma from "../../config/prisma";
import { generarQR } from '../correo/qr';
import { mandarEmail } from '../correo/nodemailer';

export const getDetail = async(id)=>{
    try {
        const detail = await prisma.detalleFactura.findFirst({
            where : {
                id
            },
            select : {
                cantidad : true,
                id : true,
                factura : {
                    select : {
                        usuario : {
                            select : {
                                id : true,
                                email : true
                            }
                        }
                    }
                },
                espacio : {
                    select : {
                        capacidad : true,
                        descripcion : true,
                        sector : {
                            select : {
                                
                                nombre : true,
                                lugar : {
                                    select :{
                                    
                                        direccion : true ,
                                        evento: {
                                            select : {
                                                titulo : true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return detail

    } catch (error) {
        return error;        
    }
}

export const mandarEntradas = async(id)=>{

    const detalle=await getDetail(id)
    const longitud = detalle.cantidad * detalle.espacio.capacidad;
    const array = Array.from(Array(longitud).keys())
    const attachments =[]
    array.forEach((index) =>{
        generarQR(detalle , index)
        console.log(`Pase ${index} veces`)
        attachments.push( {
            filename : `Entrada ${index+1}`,
            path : `${path.join(__dirname, '../../../pdf',`${detalle.id}${index}.pdf`)}`,
            contentType : 'application/pdf'
        })
    })
    console.log(attachments)
    mandarEmail(detalle.factura.usuario.email , attachments)
}