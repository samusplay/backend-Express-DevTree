import { CorsOptions } from "cors";
console.log(process.env.FRONTEND_URL);
export const corsConfig:CorsOptions={
    //Quien quiere conectarse al servidor
    origin:function(origin,callback){
        //Estamos registrando el dominio
        if(origin===process.env.FRONTEND_URL){
            callback(null,true) 
        }else{
            callback(new Error('Error de CORS'))
        }

    }
}  