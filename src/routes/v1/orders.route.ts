// orders.routes.ts
import { Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { canAccessCustomerResource } from '../../middleware/customerAuth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/orders', authRoles(["admin", "superadmin"]), ordersController.findAll);
router.get('/orders/customer/:customer_id', canAccessCustomerResource(), ordersController.findByCustomerId);
router.get('/orders/:id', ordersController.findById);
router.post('/orders', ordersController.create);
router.put('/orders/:id', ordersController.updateById);
router.delete('/orders/:id', ordersController.deleteById);

export default router;
