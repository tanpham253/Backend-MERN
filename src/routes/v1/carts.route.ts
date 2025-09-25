// cart.routes.ts
import { Router } from 'express';
import * as cartController from '../../controllers/carts.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { canAccessAddressById } from '../../middleware/customerAuth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/carts', authRoles(["admin", "superadmin"]), cartController.findAll);
router.get('/carts/customer/:customer_id', canAccessAddressById(), cartController.findByCustomerId);
router.get('/carts/:id', cartController.findById);
router.post('/carts', cartController.create);
router.put('/carts/:id', cartController.updateById);
router.delete('/carts/:id', cartController.deleteById);

export default router;
