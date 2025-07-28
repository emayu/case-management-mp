import { Router } from 'express';
import { getFiscalias } from '../controllers/fiscalia.controller';
import { requireLogin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', requireLogin, getFiscalias);

export default router;