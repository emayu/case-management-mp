/**
 * @license
 * Copyright (c) 2025 Héctor Yaque
 * Licensed under the Creative Commons BY-NC-ND 4.0 license.
 * See LICENSE file in the project root for full license information.
 */

import express, { Express } from "express";
import morgan from "morgan";
import apiRoutes from "./routes";
import { sessionMiddleware } from "./config/session";
import cors from 'cors';
import { Cookie } from "express-session";
import bcrypt from 'bcrypt';

console.log(
    'ENV:', process.env.ENV,
    'PORT:', process.env.PORT,
    'SESSION_SECRET ', process.env.SESSION_SECRET ? 'Is defined': undefined
);

const server:Express = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "DEV";



if( ENV === "PROD"){
    server.use(morgan('combined'));
}else{
    server.use(morgan('dev'));
}

//Middlewares base
server.use(cors());
server.use(express.json());
server.use(sessionMiddleware)

//Ruta base de servidor
server.use("/api/v1", apiRoutes);

server.get('/', (req, res)=> {
    res.send('Hello MP');  
});

//monitoring and health 
//aunque en la prueba no se pide esto es una buena practica para DevOps 
server.get('/version', (req, res) => {
    res.status(200).json({
      version: process.env['BUILD_TAG'] || 'unknown', //for future deploys
    });
  });
server.get('/healthz', (req, res) => res.json({ ok: true }));


server.listen(PORT, ()=> {
    console.log(`Hello MP from NodeJS + Typscript. Server started on ${PORT}` )
})