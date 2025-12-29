import {Router} from 'express'
import { createAccount } from './handlers'

const router=Router()

//Routing en propio archivo
//Agregamos el handler
/** Autenticacion y registro */
router.post('/auth/register',createAccount)



export default router