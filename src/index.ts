//exportamos express

import express from 'express'; //ESM
//instaciamos el app
const app=express()

//Routing
app.get('/',(req,res)=>{
    res.send('Hola Mundo desde Express')
})
//podemos definir mas rutas



//definimos el puerto Y agregamos variable de entorno
const port=process.env.PORT ||4000
//Arroy funcition para definir mas limpio una funcion 
app.listen(port,()=> {
    console.log('Servidor funcionando en el puerto ',port);
})