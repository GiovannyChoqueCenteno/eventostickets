import { Router } from "express";
import * as entradaController from '../controllers/entrada.controller'

const router = Router()

router.post('/'  , entradaController.addEntrada)
router.get('/:id' , entradaController.getEntradaById)
router.get('/detalle/:detalleId' , entradaController.getEntradasByDetalle)

export default router;