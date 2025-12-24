import colors from 'colors'
//exportamos server desde el archivo ya que ahi esta express
import server from "./server"

//podemos definir mas rutas



//definimos el puerto Y agregamos variable de entorno
const port=process.env.PORT ||4000
//Arroy funcition para definir mas limpio una funcion 
server.listen(port,()=> {
    console.log(colors.bgBlue.magenta.italic('Servidor funcionando en el puerto '),port);
})