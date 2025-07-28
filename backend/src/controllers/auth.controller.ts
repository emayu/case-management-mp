import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import { sendResponse } from '../utils/sendResponse';

export async function login(req: Request, res: Response) {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return sendResponse(res, 400, {  status: 'fail', message: 'Correo y contraseña requeridos' });
    }

    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
        return sendResponse(res, 401,{ status: 'fail', message: 'Credenciales inválidas' });
    }


    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
        return sendResponse(res, 401, {
            status: 'fail',
            message: 'Credenciales inválidas'
        });
    }

    req.session.user = {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
    };

    req.session.save((err) => {
        if (err) {
            console.error('Error al guardar sesión', err);
            return sendResponse(res, 500, {
                status: 'error',
                message: 'Error al guardar la sesión'
            });
        }

        return sendResponse(res, 200, {
            status: 'success',
            message: 'Login exitoso',
            data: {
                usuario: user.nombre
            }
        });
    });


}


export function getSession(req:Request, res:Response){
    if(!req.session.user){
        return sendResponse(res, 401, { status:'fail', message:'No hay sesiones activas'});
    }

    return sendResponse(res, 200, {
        status: 'success',
        message: 'Sesión activa',
        data: {
            usuario: req.session.user
        }
    });
}


export function logout( req:Request, res:Response){
    req.session.destroy( (err) => {
        if(err){
            console.error('Error al cerrar sesión:', err);
            return sendResponse( res, 500, { status: 'error', message: 'No se pudo cerrar la sesión'})
        }
        res.clearCookie('connect.sid');
        return sendResponse(res, 200, {
            status: 'success',
            message: 'Sesión cerrada exitosamente'
        })
    });
}