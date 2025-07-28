import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { Role } from '../constants';

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user) {
    return next(); // usuario autenticado
  }

  return sendResponse(res, 401, {
    status: 'fail',
    message: 'No autorizado. Inicia sesión primero.',
  });
}

export function requireRole(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.session.user;
        if (!user) {
            return sendResponse(res, 401, {
                status: 'fail',
                message: 'No autorizado. Inicia sesión primero.',
            });
        }

        if (!allowedRoles.includes(user.rol as Role)) {
            return sendResponse(res, 403, {
                status: 'fail',
                message: 'No tienes permisos para acceder a este recurso',
            });
        }

        next();
    }
}