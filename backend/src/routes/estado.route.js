import { Router } from 'express'
import * as estadoController from '../controllers/estado.controller'


const router = Router()

router.get('/' , estadoController.getEstados)

router.post('/' , estadoController.addEstado)

export default router