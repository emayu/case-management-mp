import { Router } from 'express';
import { getCasos, getCasoById } from '../controllers/caso.controller';
import { requireLogin } from '../middlewares/auth.middleware';

const router = Router();

router.use( requireLogin)
router.get('/', getCasos);
router.get('/:id', getCasoById)

export default router;