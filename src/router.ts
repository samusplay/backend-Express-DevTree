import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

const router=Router()

//Routing en propio archivo
//Agregamos el handler
/** Autenticacion y registro */
router.post('/auth/register',
    body('handle').notEmpty(),
    createAccount)



export default router