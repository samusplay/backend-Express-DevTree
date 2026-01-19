import { CorsOptions } from "cors";

export const corsConfig:CorsOptions={
    //Quien quiere conectarse al servidor
    origin:function(origin,callback){
        //Creamos un arreglo de dominios
        const whiteList=[process.env.FRONTEND_URL]
        //se requiere ejuctar el script
        if(process.argv[2]==='--api'){
            whiteList.push(undefined)

        }
    
        //Estamos registrando el dominio
        if(whiteList.includes(origin)){
            callback(null,true) 
        }else{
            callback(new Error('Error de CORS'))
        }

    }
}  