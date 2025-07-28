import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model'; 
import { sendResponse } from '../utils/sendResponse';

export async function getUsuarios(req: Request, res: Response) {
    try {
        const { fiscalia_id  } = req.query;

        const usuarios = await Usuario.findAll( {
            where: fiscalia_id ? {fiscalia_id: fiscalia_id.toString()}: undefined,
            attributes: { exclude: ['contrasenia']},
        });

        return sendResponse(res, 200, {
            status: 'success',
            message: 'Lista de usuarios obtenida correctamente',
            data: usuarios
        });
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al obtener los usuarios'
        })
    }
}