import { Request, Response } from 'express';
import { Fiscalia } from '../models/fiscalia.model'; 
import { sendResponse } from '../utils/sendResponse';


export async function getFiscalias(req: Request, res: Response) {
    try {
        const casos = await Fiscalia.findAll();
        return sendResponse(res, 200, {
            status: 'success',
            message: 'Lista de fiscalías obtenida correctamente',
            data: casos
        });
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, {
            status: 'error',
            message: 'Error al obtener las fiscalías'
        })
    }
}