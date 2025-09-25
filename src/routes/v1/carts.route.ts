// cart.routes.ts
import { Router } from 'express';
import * as cartController from '../../controllers/carts.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import cartValidation from '../../validations/cart.validation';
import { 
  checkCustomerOwnership, 
  checkCustomerIdOwnership, 
  checkCustomerCreateOwnership 
} from '../../middleware/customerOwnership.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/carts', authRoles(["admin", "superadmin"]), cartController.findAll);
router.get('/carts/customer/:customer_id', validateSchemaYup(cartValidation.findByCustomerId), checkCustomerIdOwnership(), cartController.findByCustomerId);
router.get('/carts/:id', validateSchemaYup(cartValidation.findById), checkCustomerOwnership('cart'), cartController.findById);
router.post('/carts', validateSchemaYup(cartValidation.create), checkCustomerCreateOwnership(), cartController.create);
router.put('/carts/:id', validateSchemaYup(cartValidation.updateById), checkCustomerOwnership('cart'), cartController.updateById);
router.delete('/carts/:id', validateSchemaYup(cartValidation.deleteById), checkCustomerOwnership('cart'), cartController.deleteById);

export default router;
