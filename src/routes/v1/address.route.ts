import { Router } from 'express';
import addressController from '../../controllers/address.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import addressValidation from '../../validations/address.validation';
import { 
  checkCustomerOwnership, 
  checkCustomerIdOwnership, 
  checkCustomerCreateOwnership 
} from '../../middleware/customerOwnership.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/addresses', authRoles(["admin"]), addressController.findAll);
router.get('/addresses/customer/:customer_id', validateSchemaYup(addressValidation.findByCustomerId), checkCustomerIdOwnership(), addressController.findByCustomerId);
router.get('/addresses/:id', validateSchemaYup(addressValidation.findById), checkCustomerOwnership('address'), addressController.findById); 
router.post('/addresses', validateSchemaYup(addressValidation.create), checkCustomerCreateOwnership(), addressController.create);
router.put('/addresses/:id', validateSchemaYup(addressValidation.updateById), checkCustomerOwnership('address'), addressController.updateById);
router.delete('/addresses/:id', validateSchemaYup(addressValidation.deleteById), checkCustomerOwnership('address'), addressController.deleteById);

export default router;
