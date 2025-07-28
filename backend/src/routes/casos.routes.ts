import { Router } from 'express';
import { getCasos } from '../controllers/caso.controller';
import { requireLogin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', requireLogin, getCasos);

export default router;