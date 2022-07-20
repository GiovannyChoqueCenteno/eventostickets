import { Router } from 'express'
import * as fotoController from '../controllers/foto.controller'

const router = Router()

router.get('/:id', fotoController.getFotosByEvento)
router.get('/image/:fileName', fotoController.getFotoName)
router.get('/firts/:id', fotoController.getFotosFirtEvento)
router.post('/', fotoController.addFoto)

export default router