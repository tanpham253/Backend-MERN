// orders.routes.ts
import { Router } from 'express';
import ordersController from '../../controllers/orders.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import orderValidation from '../../validations/order.validation';
import { 
  checkCustomerOwnership, 
  checkCustomerIdOwnership, 
  checkCustomerCreateOwnership 
} from '../../middleware/customerOwnership.middleware';

const router = Router();


router.get('/orders', ordersController.findAll);
router.get('/orders/:id', ordersController.findById);

router.post('/orders', ordersController.create);
router.put('/orders/:id', ordersController.updateById);
router.delete('/orders/:id', ordersController.deleteById);

export default router;
