// orders.routes.ts
import { Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import orderValidation from '../../validations/order.validation';
import { 
  checkCustomerOwnership, 
  checkCustomerIdOwnership, 
  checkCustomerCreateOwnership 
} from '../../middleware/customerOwnership.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/orders', authRoles(["admin", "superadmin"]), ordersController.findAll);
router.get('/orders/customer/:customer_id', validateSchemaYup(orderValidation.findByCustomerId), checkCustomerIdOwnership(), ordersController.findByCustomerId);
router.get('/orders/:id', validateSchemaYup(orderValidation.findById), checkCustomerOwnership('order'), ordersController.findById);
router.post('/orders', validateSchemaYup(orderValidation.create), checkCustomerCreateOwnership(), ordersController.create);
router.put('/orders/:id', validateSchemaYup(orderValidation.updateById), checkCustomerOwnership('order'), ordersController.updateById);
router.delete('/orders/:id', validateSchemaYup(orderValidation.deleteById), checkCustomerOwnership('order'), ordersController.deleteById);

export default router;
