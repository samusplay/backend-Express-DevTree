import express from 'express'; //ESM
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db';
//instaciamos el app
//app principal
const app=express()

//Conexion a la base de datos Nosql
connectDB()

//Routing cuales cumple mporm la principal
//se va ejecutar en todas las peticiones

//leer datos de formularios
app.use(express.json())

app.use('/',router)

export default app