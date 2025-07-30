import { Request, Response } from 'express';
import { Caso } from '../models/caso.model';
import { sendResponse } from '../utils/sendResponse';
import { UniqueConstraintError } from 'sequelize';
import { Role, ROLES } from '../constants';
import { LogAsignacionCaso } from '../models/logAsignacionCasos.model';
import { Usuario } from '../models/usuario.model';
import { RESULTADO_ASIGNACION, CASO_ESTADOS } from '../constants'; 
import { Result } from 'tedious/lib/token/helpers';

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

export async function reasignar(req: Request, res: Response) {
    const { nuevo_fiscal_id, motivo  } = req.body;
    const { caso_id } = req.params;
    const { user } = req.session;
    let asignacion_result_message;
    try{
        const casoInfo = await Caso.findByPk(caso_id);
        if(casoInfo == null){
            return sendResponse(res, 404, {
                status: 'fail',
                message: `El caso con id:${caso_id} no fue encontrado`
            });
        }

        const fiscalNuevoInfo = await Usuario.findByPk(nuevo_fiscal_id);
        if(fiscalNuevoInfo == null){
            return sendResponse(res, 404, {
                status: 'fail',
                message: `El nuevo_fiscal_id:${caso_id} no fue encontrado`
            });
        }

        const allowedRoles: Role[] = [ROLES.FISCAL, ROLES.ADMIN_FISCALIA];
        const partialInfo = {
                caso_id,
                fiscal_anterior_id: casoInfo.usuario_asignado_id,
                fiscal_nuevo_id: fiscalNuevoInfo.id,
                motivo,
                usuario_intento: user?.id!,
            }
        if( !user || allowedRoles.includes( user.rol as Role)){
            asignacion_result_message = 'No autorizado. No cuenta con los permisos necesarios';
            await LogAsignacionCaso.create({
                ...partialInfo,
                resultado: RESULTADO_ASIGNACION.FALLO,
                resultado_mensaje: asignacion_result_message,
                fecha: new Date()
            });
            
            return sendResponse(res, 403, {
                status: 'fail',
                message: asignacion_result_message
            });
        }
        //comprobando que el caso pertenece a la misma fiscalía que el anterior
        const fiscalAnteriorInfo = await Usuario.findByPk(casoInfo.usuario_asignado_id);
        if(fiscalAnteriorInfo && fiscalAnteriorInfo.fiscalia_id !== fiscalNuevoInfo.fiscalia_id){
            asignacion_result_message = 'No autorizado. Fiscal seleccionado no pertenece a la misma fiscalía que el anterior';
            await LogAsignacionCaso.create({
                ...partialInfo,
                resultado: RESULTADO_ASIGNACION.FALLO,
                resultado_mensaje: asignacion_result_message,
                fecha: new Date()
            });
            
            return sendResponse(res, 403, {
                status: 'fail',
                message: asignacion_result_message
            });
        }

        if(CASO_ESTADOS.PENDIENTE != casoInfo.estado){
            asignacion_result_message = 'No autorizado. El caso tiene un estado diferente a pendiente';
            await LogAsignacionCaso.create({
                ...partialInfo,
                resultado: RESULTADO_ASIGNACION.FALLO,
                resultado_mensaje: asignacion_result_message,
                fecha: new Date()
            });
            
            return sendResponse(res, 403, {
                status: 'fail',
                message: asignacion_result_message
            });
        }

        asignacion_result_message = 'Autorizado';
            const log = await LogAsignacionCaso.create({
                ...partialInfo,
                resultado: RESULTADO_ASIGNACION.EXITO,
                resultado_mensaje: asignacion_result_message,
                fecha: new Date()
            });
            
            return sendResponse(res, 200, {
                status: 'success',
                message: asignacion_result_message
            });

    }catch(error){
        console.log(error);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al reasignar caso'
        })
    }
}