// brand.routes.ts
import { Router } from 'express';
import * as brandController from '../../controllers/brands.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';

const router = Router();

router.get('/brands', brandController.findAll);
router.get('/brands/:id', brandController.findById);

// all routes below use authenticate
router.use(authenticateToken);

router.post('/brands', authRoles(["admin", "superadmin"]), brandController.create);
router.put('/brands/:id', authRoles(["admin", "superadmin"]), brandController.updateById);
router.delete('/brands/:id', authRoles(["admin", "superadmin"]), brandController.deleteById);

export default router;
