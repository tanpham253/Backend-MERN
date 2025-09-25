// address.routes.ts
import { Router } from 'express';
import addressController from '../../controllers/address.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { canAccessCustomerResource } from '../../middleware/customerAuth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/addresses', authRoles(["admin", "superadmin"]), addressController.findAll);
router.get('/addresses/customer/:customer_id', canAccessCustomerResource(), addressController.findByCustomerId);
router.get('/addresses/:id', addressController.findById);
router.post('/addresses', addressController.create);
router.put('/addresses/:id', addressController.updateById);
router.delete('/addresses/:id', addressController.deleteById);

export default router;
