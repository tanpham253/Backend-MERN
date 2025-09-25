import { Router } from 'express';
import addressController from '../../controllers/address.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { canAccessAddressById } from '../../middleware/customerAuth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/addresses', authRoles(["admin", "superadmin"]), addressController.findAll);
router.get('/addresses/customer/:customer_id', canAccessAddressById(), addressController.findByCustomerId);
router.get('/addresses/:id', canAccessAddressById(), addressController.findById); 
router.post('/addresses', canAccessAddressById(), addressController.create);
router.put('/addresses/:id', canAccessAddressById(), addressController.updateById);
router.delete('/addresses/:id', canAccessAddressById(), addressController.deleteById);

export default router;
