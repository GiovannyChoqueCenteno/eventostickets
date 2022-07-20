import { Router } from 'express'
import * as lugarController from '../controllers/lugar.controller'

const router = Router()

router.post('/' , lugarController.addLugar)

router.get('/:id'  , lugarController.getLugaresByEvento)


export default router;