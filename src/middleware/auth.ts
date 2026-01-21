//Importamos para evitarnos any
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User,{IUser} from '../models/User'
//Usamos un declarador
declare global{
    namespace Express{
        interface Request{
            user?:IUser

        }
    }
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //debemos validar  que no se undefined
    const bearer = req.headers.authorization
    //Bebe tener un Jwt
    if (!bearer) {
        const error = new Error('No Autorizado')
        return res.status(401).json({ error: error.message })
    }
    //validar dentro del bearer
    const [, token] = bearer.split(' ')
    //el espacio vacio lo ignoramos
    if (!token) {
        const error = new Error('No Autorizado')
        return res.status(401).json({ error: error.message })
    }
    //verificar
    try {
        //pasamos el token y la variable de entorno
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result === 'object' && result.id) {
            //obtenemos el usuario para buscar el usuario -password no lo traemos
            const user = await User.findById(result.id).select('-password')
            if (!user) {
                const error = new Error('El usuario no existe')
                return res.status(404).json({ error: error.message })
            }
            //Traemos la respuesta usando Next
            req.user=user
            next()

        }
    } catch (error) {
        res.status(500).json({ error: 'Token no Valido' })

    }



}