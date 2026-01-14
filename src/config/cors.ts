import { CorsOptions } from "cors";

export const corsConfig:CorsOptions={
    //Quien quiere conectarse al servidor
    origin:function(origin,callback){
        //Estamos registrando el dominio
        if(origin==='http://localhost:5173'){
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }

    }
}  