import { Request, Response } from 'express';
import { Caso } from '../models/caso.model';
import { sendResponse } from '../utils/sendResponse';

export async function getCasos(req: Request, res: Response) {
    try {
        const casos = await Caso.findAll();
        return sendResponse(res, 200, {
            status: 'success',
            message: 'Lista de casos obtenida correctamente',
            data: casos
        });
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al obtener los casos'
        })
    }
}

export async function getCasoById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const caso = await Caso.findByPk(id);

        if (caso == null) {
            return sendResponse(res, 404, {
                status: 'fail',
                message: 'Caso no encontrado',
            });
        }

        return sendResponse(res, 200, {
            status: 'success',
            message: 'Caso obtenido correctamente',
            data: caso
        });
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al obtener el caso'
        })
    }
}