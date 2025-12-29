import User from "../models/User"
import {Request,Response} from 'express'
//Tener cuidado con Any
 export const createAccount=async(req:Request,res:Response)=>{
    console.log('Desde Register')
    //soporta el ingreso de datos
    console.log(req.body)
    //formulario tipo post

    //para guardar en la base de datos
    const user=new User(req.body)

    await user.save()
    
    //configurar respuesta hasta ahi llega el codigo
    res.send('Registro Creado Correctamente ')

}