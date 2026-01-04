import { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from 'slug';
import User from "../models/User";
import { hashPassword } from "../utils/auth";
//Tener cuidado con Any
export const createAccount = async (req: Request, res: Response) => {
  
  //Manejar  errores
  let errors=validationResult(req)
  if(!errors.isEmpty()){
    //Si el arreglo de errores esta vacio
    return res.status(400).json({errors:errors.array()})
  }

  //Validaciones
  const { email, password } = req.body;

  //Metodo de moongose para buscr y pasamos objeto
  const UserExists = await User.findOne({ email });
  //Validaciones
  if (UserExists) {
    const error = new Error("El usuario ya esta registrado");
    //debe detener la respuesta conn el objeto y parar
    return res.status(409).json({ error: error.message });
  }

  //Revisar que un usuario no tenga el mismo handle
  //utilizamos la funcion de slug con un modificador
  const handle=slug(req.body.handle,'-')

  const handleExists=await User.findOne({handle})
  if(handleExists){
    const error=new Error('Nombre de usuario no disponible')
    return res.status(409).json({error:error.message})
  }

  //para guardar en la base de datos
  const user = new User(req.body);
  //la funcion de Utils es asincrona 
  //Aqui ponemos lo que ingresa el usuario
  user.password = await hashPassword(password);
  user.handle=handle

  
 

  await user.save();

  //configurar respuesta hasta ahi llega el codigo
  res.status(201).send("Registro Creado Correctamente ");
};
