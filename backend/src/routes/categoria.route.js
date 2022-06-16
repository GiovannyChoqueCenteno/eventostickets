import {Router} from "express";
import * as categoriaController from '../controllers/categoria.controller'
import categoriaValidation from "../utils/validations/categoria.validation";

const router = Router()


router.get('/', categoriaController.getCategorias)

router.post('/', categoriaValidation(), categoriaController.addCategoria)

router.put('/:id', categoriaController.updateCategoria)

export default router