import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from './handlers'
import { authenticate } from './middleware/auth'
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
//Le pasamos el midlware
router.get('/user', authenticate, getUser)

//enpoint con patch solo modifcamos valores especificos
router.patch('/user',
    //validacion
    //Reglas de validacion
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio '),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)
router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage(' El handle no puede ir vacio'),
    handleInputErrors,
    searchByHandle
)


export default router