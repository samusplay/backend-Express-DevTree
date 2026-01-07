import brcypt from 'bcrypt'

export const hashPassword=async(password:string)=>{
    //salt genera un cadena random los hash son unicos
    //mas alto las rondas es mayor la seguridad
    const salt=await brcypt.genSalt(10)
    //pasamos los dos argumentos password y salt
    return await brcypt.hash(password,salt)

}

//funcion para el inicio de sesion

export const checkPassword=async(enteredPassword:string, hash:string)=>{
    //metodo para comparar de la misma funcion
    return await brcypt.compare(enteredPassword,hash)
    

}