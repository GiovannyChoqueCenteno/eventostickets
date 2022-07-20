import { Router } from 'express'

import * as espacioController from '../controllers/espacio.controller'

const router = Router()

router.post('/' , espacioController.addEspacio)
router.get('/:id' , espacioController.getEspacios)
router.get('/one/:id' , espacioController.getEspacio)




export default router