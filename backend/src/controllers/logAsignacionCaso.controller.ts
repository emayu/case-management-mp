import { Request, Response } from 'express';
import { LogAsignacionCaso } from '../models/logAsignacionCasos.model'; 
import { sendResponse } from '../utils/sendResponse';


export async function findAllByCasoId(req: Request, res: Response) {
    const { caso_id } = req.params; 
    try {
        const logAsignacionCasosList = await LogAsignacionCaso.findAll(
            {where: { caso_id}}
        );
        return sendResponse(res, 200, {
            "status": "success",
            "message": "Historial de asignaciones obtenido correctamente",
            "data": logAsignacionCasosList
        })
    }catch(error){
        console.log(error);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al obtener lista de LogAsignacionCasos'
        });
    }
}