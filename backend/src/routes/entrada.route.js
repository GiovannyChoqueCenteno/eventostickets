import { Router } from "express";
import * as entradaController from '../controllers/entrada.controller'

const router = Router()

router.post('/', entradaController.addEntrada)
router.get('/:id', entradaController.getEntradaById)
router.get('/detalle/:detalleId', entradaController.getEntradasByDetalle)
router.get('/codigo/:codigo',entradaController.getEntradaByCodigo)
// add
router.post('/registrar', entradaController.registrarEntrada)
router.get('/registro/:lugarId', entradaController.getEntradasCompradas)

export default router;