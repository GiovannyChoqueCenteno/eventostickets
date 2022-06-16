import express from "express";
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv";

import categoriaRoute from "./routes/categoria.route";
import eventoRoute from "./routes/evento.route"
import espacioRoute from "./routes/espacio.route"
import horarioRoute from "./routes/horario.route"
import  lugarRoute from "./routes/lugar.route"
import fotoRoute from "./routes/foto.route"
import estadoRoute from "./routes/estado.route"
import sectorRoute from "./routes/sector.route"
import detalleFacturaRoute from './routes/detalleFactura.route'
import entradaRoute from './routes/entrada.route'
import facturaRoute from './routes/factura.route'
import usuarioRoute from './routes/usuario.route'

const app = express()

app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
dotenv.config();


app.use(express.static('public'))


app.use('/api/categoria',categoriaRoute)
app.use('/api/espacio', espacioRoute)
app.use('/api/estado' , estadoRoute)
app.use('/api/evento', eventoRoute )
app.use('/api/foto', fotoRoute)
app.use('/api/horario' , horarioRoute)
app.use('/api/lugar' , lugarRoute)
app.use('/api/sector',sectorRoute)
app.use('/api/detalleFactura' , detalleFacturaRoute)
app.use('/api/entrada' ,entradaRoute)
app.use('/api/factura' , facturaRoute)
app.use('/api/usuario' , usuarioRoute)

app.listen(4000 , ()=>{
    console.log("Escuchando")
})