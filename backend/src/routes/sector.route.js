import { Router } from 'express'
import * as sectorController from '../controllers/sector.controller'

const router = Router()

router.post('/' , sectorController.addSector)

router.get('/:id'  , sectorController.getSectoresByLugar)


export default router;