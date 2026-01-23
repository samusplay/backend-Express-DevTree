//Importamos mongoose
import mongoose, { Schema } from "mongoose";

//La informacion que requiere 
 export interface IUser {
    //agregamos handle
    handle:string
    name:string
    email:string
    password:string 
    description:string                                                                                                                                                                               
}
//Definimos el tipo de dato
//Codigo moongosee
const userSchema = new Schema({
    //Objeto modelo
    //Reglas de registros
      handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true

    },
    name: {
        type: String,
        required: true,
        trim: true

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true

    },

    password: {
        type: String,
        required: true,
        trim: true

    },
    //Podemos agregar mas modelos 
    description:{
        type:String,
        default:''
    }

})

//Pasarle dos parametros y pasarle la interface con generic
const User = mongoose.model<IUser>('User', userSchema)
//Podemos usarlo en cualquie lugar
export default User