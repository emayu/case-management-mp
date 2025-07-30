import { Router } from 'express';
import { getCasos, getCasoById, createCaso, updateCaso, reasignar } from '../controllers/caso.controller';
import { requireLogin } from '../middlewares/auth.middleware';
import { findAllByCasoId as findAllLogAsignacionesByCasosId  } from '../controllers/logAsignacionCaso.controller';

const router = Router();

router.use( requireLogin);
router.get('/', getCasos);
router.get('/:id', getCasoById);
router.post('/', createCaso);
router.put('/:id', updateCaso);
router.get('/:caso_id/log-asignaciones', requireLogin, findAllLogAsignacionesByCasosId);
router.post('/:caso_id/reasignar', reasignar);


export default router;