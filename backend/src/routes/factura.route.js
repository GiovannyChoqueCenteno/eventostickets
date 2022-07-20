import { Router } from "express";
import * as facturaController from '../controllers/factura.controller'

const router = Router()


router.get('/:id ' , facturaController.getFacturaById)
router.post('/' , facturaController.addFactura)
router.get('/usuario/:usuarioId' , facturaController.getFacturasByUser)
router.get('/detalle/:id', facturaController.getFacturaWithDetalles)

export default router;