import { Request, Response } from "express";
import { validationResult } from "express-validator";
import slug from 'slug';
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

//Tener cuidado con Any
export const createAccount = async (req: Request, res: Response) => {



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
  const handle = slug(req.body.handle, '-')
  const handleExists = await User.findOne({ handle })
  if (handleExists) {
    const error = new Error('Nombre de usuario no disponible')
    return res.status(409).json({ error: error.message })
  }

  //para guardar en la base de datos
  const user = new User(req.body);
  //la funcion de Utils es asincrona 
  //Aqui ponemos lo que ingresa el usuario
  user.password = await hashPassword(password);
  user.handle = handle




  await user.save();

  //configurar respuesta hasta ahi llega el codigo
  res.status(201).send("Registro Creado Correctamente ");
};

export const login = async (req: Request, res: Response) => {
  //Manejar  errores
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    //Si el arreglo de errores esta vacio
    return res.status(400).json({ errors: errors.array() })
  }

  //luego se pasa de la comprobacion 

  //Validaciones
  const { email, password } = req.body;

  //Revisar si el usuario esta registrado
  //Metodo de moongose para buscr y pasamos objeto
  const user = await User.findOne({ email });
  //Validaciones
  if (!user) {
    const error = new Error("El usuario no existe");
    //debe detener la respuesta conn el objeto y parar
    return res.status(404).json({ error: error.message });
  }

  //Comprobar el password
  //Es necesario que espere
  const isPasswordCorrect = await checkPassword(password, user.password)
  if (!isPasswordCorrect) {
    const error = new Error("Password Incorrecto");
    //debe detener la respuesta conn el objeto y parar
    return res.status(401).json({ error: error.message });
  }

  //Retornar el JWT con la informacion necesaria tarvez de un objeto
  const token = generateJWT({ id: user._id })
  res.send(token)

}

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    const handle = slug(req.body.handle, '-')
    const handleExists = await User.findOne({ handle })
    //Condicion para que el usuario actualize si es el mismo
    if (handleExists &&handleExists.email!==req.user.email) {
      const error = new Error('Nombre de usuario no disponible')
      return res.status(409).json({ error: error.message })
    }
    //Actualizar el usuario
    req.user.description=description
    req.user.handle=handle
    //Guardamos
    await req.user.save()
    res.send('Perfil actualizado Correctamente')


  } catch (e) {
    const error = new Error('Hubo un error')
    return res.status(500).json({ error: error.message })
  }
}
