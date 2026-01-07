import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

//Routing en propio archivo
//Agregamos el handler
/** Autenticacion y registro */
router.post('/auth/register',
    //Reglas de validacion
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio '),
    //validar los campos del name 
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio '),

    //Validar el campo de email
    body('email')
        .isEmail()
        .withMessage('Email no valido '),

    //Validar el campo del password
    body('password')
        .isLength({ min: 8 })
        .withMessage('El password  no puede ir vacio '),

    //manejar los errores
    handleInputErrors,
    createAccount
)

router.post('/auth/login',

    //Validar el campo de email
    body('email')
        .isEmail()
        .withMessage('Email no valido '),

    //Validar el campo del password
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio '),


    handleInputErrors,
    login
)


export default router