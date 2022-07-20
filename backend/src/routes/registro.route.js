import express from 'express'
import * as registroController from '../controllers/registro.controller';

const router = express.Router();


router.post('/' , registroController.addRegistro)


export default router;