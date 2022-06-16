import qrcode from 'qrcode'
import pdf from 'html-pdf'



export const generarQR = async (detalle , index) => {
    const qrData = await qrcode.toDataURL(`
    Evento :  ${detalle.espacio.sector.lugar.evento.titulo}
    Lugar : ${detalle.espacio.sector.lugar.direccion}
    Sector :  ${detalle.espacio.sector.nombre}
    Espacio : ${detalle.espacio.descripcion}
    `)
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
    
            p {
                display: block;
                font: 400;
            }
    
            span {
                font-weight: 700;
            }
        </style>
    </head>
    
    <body>
        <h1>Entrada para evento </h1>
        <p><span>Evento : </span> ${detalle.espacio.sector.lugar.evento.titulo}</p>
        <p><span>Lugar : </span>${detalle.espacio.sector.lugar.direccion}</p>
        <p><span>Sector : </span> ${detalle.espacio.sector.nombre}</p>
        <p><span>Espacio : </span>${detalle.espacio.descripcion}</p>
        <img src=${qrData} />
    </body>
    
    </html>
  `
    pdf.create(htmlContent).toFile(`./pdf/${detalle.id}${index}.pdf`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

