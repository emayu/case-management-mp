import { Request, Response } from 'express';
import { Caso } from '../models/caso.model';
import { sendResponse } from '../utils/sendResponse';
import { UniqueConstraintError } from 'sequelize';

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

export async function createCaso(req: Request, res: Response) {
    const { numero_caso, nombre, descripcion, usuario_asignado_id, fiscalia_id  } = req.body;
    const {user} = req.session;
    const now = new Date();
    try{
        const newCaso = await Caso.create( {numero_caso, nombre, descripcion, usuario_asignado_id, fiscalia_id,
             usuario_creacion: user?.id!, usuario_modificacion: user?.id!, fecha_creacion: now, fecha_modificacion: now});
        return sendResponse(res, 201, {
            status: 'success',
            message: 'Caso creado',
            data: newCaso
        });
    }catch(error){
        if (error instanceof UniqueConstraintError) {
            if (error.parent.message.includes('casos_unique')) {
                return sendResponse(res, 409, {
                    "status": "fail",
                    "message": "Ya existe un caso con ese número",
                });
            }
        }
        console.log(error);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al crear caso'
        })
    }
}

export async function updateCaso(req: Request, res: Response) {
    const { numero_caso, nombre, descripcion, usuario_asignado_id, fiscalia_id, estado  } = req.body;
    const { id } = req.params;
    const {user} = req.session;
    const now = new Date();
    try {

        const [row, [result]] = await Caso.update({
            numero_caso,
            nombre,
            descripcion,
            usuario_asignado_id,
            fiscalia_id, estado,
            fecha_modificacion: now,
            usuario_modificacion: user?.id
        }, { where: { id }, returning: true });

        return sendResponse(res, 200, {
            "status": "success",
            "message": "Caso actualizado correctamente",
            "data": result
        });

    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            if (error.parent.message.includes('casos_unique')) {
                return sendResponse(res, 409, {
                    "status": "fail",
                    "message": "Ya existe un caso con ese número",
                });
            }
        }
        console.log(error);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al crear caso'
        })
    }
}
