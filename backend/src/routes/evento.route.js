import { Router } from 'express'
import * as eventoController from '../controllers/evento.controller'

const router = Router()

//Admin
router.get('/' , eventoController.getEventos)
router.post('/', eventoController.createEvento)
router.delete('/:id',eventoController.deleteEvento)
router.put('/:id' , eventoController.updateEvento)


export default router