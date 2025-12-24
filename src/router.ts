import {Router} from 'express'

const router=Router()

//Routing en propio archivo
/** Autenticacion y registro */
router.post('/auth/register',(req,res)=>{
    console.log('Desde Register')
    //soporta el ingreso de datos
    console.log(req.body)
    //formulario tipo post
})

export default router