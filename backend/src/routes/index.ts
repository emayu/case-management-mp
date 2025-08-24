import { Router } from 'express';
import authRoutes from './auth.routes';
import casoRoutes from './casos.routes';
import fiscaliasRoutes from './fiscalias.routes';
import usuariosRoutes from './usuarios.routes';

const router = Router();

router.use('/', authRoutes);
router.use('/casos', casoRoutes);
router.use('/fiscalias', fiscaliasRoutes);
router.use('/usuarios', usuariosRoutes);


export default router;