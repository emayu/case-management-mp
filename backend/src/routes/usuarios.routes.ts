import { Router } from 'express';
import { getUsuarios } from '../controllers/usuario.controller'; 
import { requireRole } from '../middlewares/auth.middleware';
import { ROLES } from '../constants';

const router = Router();

router.get('/', requireRole(ROLES.ADMIN_SYSTEM),  getUsuarios);

export default router;