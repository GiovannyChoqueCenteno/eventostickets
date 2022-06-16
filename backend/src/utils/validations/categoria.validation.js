import {check} from 'express-validator'


const categoriaValidation = () => {
    return [
        check('nombe').isLength({min: 8}),
        check('descripcion').isLength({min: 10})
    ]
}

export default categoriaValidation