import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    //Tener auto completado
    let errors = validationResult(req)
    console.log('Dede validation.ts')
    if (!errors.isEmpty()) {
        //Si el arreglo de errores esta vacio
        return res.status(400).json({ errors: errors.array() })
    }
    //Para que no se quede en procesing la solicitud
    next()
}