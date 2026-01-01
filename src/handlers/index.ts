import User from "../models/User"
import {Request,Response} from 'express'
import { hashPassword } from "../utils/auth"
//Tener cuidado con Any
 export const createAccount=async(req:Request,res:Response)=>{
    console.log('Desde Register')

    //Validaciones
    const {email,password}=req.body

    //Metodo de moongose para buscr y pasamos objeto
    const UserExists=await User.findOne({email})
    //Validaciones
    if(UserExists){
        const error=new Error('El usuario ya esta registrado')
        //debe detener la respuesta conn el objeto y parar
         return res.status(409).json({error:error.message})
    }
    
    //para guardar en la base de datos
    const user=new User(req.body)
    //la funcion de Utils es asincrona
    user.password= await hashPassword(password)
    
   

    await user.save()
    
    //configurar respuesta hasta ahi llega el codigo
    res.status(201).send('Registro Creado Correctamente ')

}