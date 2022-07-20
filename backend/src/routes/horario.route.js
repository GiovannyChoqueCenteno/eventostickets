import { Router } from 'express'
import * as horarioController from '../controllers/horario.controller'


const router = Router()

router.post('/', horarioController.addHorario)

router.get('/:id', horarioController.getHorariosByLugar)


export default router