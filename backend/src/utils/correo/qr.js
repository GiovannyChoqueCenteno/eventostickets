import qrcode from 'qrcode'
import pdf from 'html-pdf'



export const generarQR = async (detalle, index) => {
    //console.log("Intente crear el qr")


    const jsonData = {
        eventoId: detalle.espacio.sector.lugar.evento.id,
        lugarId: detalle.espacio.sector.lugar.id,
        entradaId: detalle.entradas[index].id
        // Evento: detalle.espacio.sector.lugar.evento.titulo,
        // Lugar: detalle.espacio.sector.lugar.direccion,
        // Sector: detalle.espacio.sector.nombre,
        // Espacio: detalle.espacio.descripcion
    }
    const qrData = await qrcode.toDataURL(`${JSON.stringify(jsonData)}`, { width: 60 })
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8" />
        <title>PDF Result Template</title>
        <style>
            body {
                text-align: center;
            }
            small{
                display: block;
            }
            span {
                font-weight: 700;
            }
            h4 {
                padding: 0;
                margin: 10px;
            }
        </style>
    </head>
    
    <body>
        <h4>Entrada para evento </h4>
        <small><span>Evento  :</span>${detalle.espacio.sector.lugar.evento.titulo}</small>
        <small><span>Lugar   :</span>${detalle.espacio.sector.lugar.direccion}</small>
        <small><span>Sector  :</span>${detalle.espacio.sector.nombre}</small>
        <small><span>Espacio :</span>${detalle.espacio.descripcion}</small>
        <img src=${qrData} />
    </body>
    
    </html>
  `
    console.log("intentando crear")
    pdf.create(htmlContent, { height: "150px", width: "250px", }).toFile(`./pdf/${detalle.id}${index}.pdf`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

