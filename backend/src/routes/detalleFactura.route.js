import { Router } from "express";
import * as detalleController from '../controllers/detalleFactura.controller'

const router = Router()

router.get('/:id',detalleController.getDetalleById);
router.post('/', detalleController.addDetalleFactura)


export default router;