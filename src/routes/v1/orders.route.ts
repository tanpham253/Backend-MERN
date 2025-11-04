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
router.get('/orders/:id', validateSchemaYup(orderValidation.findById), ordersController.findById);

router.post('/orders', validateSchemaYup(orderValidation.create), ordersController.create);
router.put('/orders/:id', validateSchemaYup(orderValidation.updateById), ordersController.updateById);
router.delete('/orders/:id', validateSchemaYup(orderValidation.deleteById), ordersController.deleteById);

export default router;
