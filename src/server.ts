import express from 'express'; //ESM
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
//instaciamos el app
//app principal
//Conexion a la base de datos Nosql
connectDB()

const app=express()

//CORS para aplicar todo el proyecto
app.use(cors(corsConfig))

//Routing cuales cumple mporm la principal
//se va ejecutar en todas las peticiones

//leer datos de formularios
app.use(express.json())

app.use('/',router)

export default app