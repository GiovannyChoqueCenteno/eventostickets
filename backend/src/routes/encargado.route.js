import { Router } from "express";
import * as encargadoController from '../controllers/encargado.controller'

const router = Router()

router.get('/:idEvento', encargadoController.getEncargadoEvento);
router.get('/', encargadoController.getAllEncargado);
router.post('/add', encargadoController.addEncargado);
router.delete('/delete', encargadoController.deleteEncargado);
router.get('/proximos/:idEncargado', encargadoController.eventosProximos);
router.get('/pasados/:idEncargado', encargadoController.eventosPasados);

export default router