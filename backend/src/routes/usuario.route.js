import { Router } from 'express'

import * as usuarioController from '../controllers/usuario.controller'


const router = Router();

router.post('/' , usuarioController.addUsuario)
router.post('/login', usuarioController.login)


export default router;