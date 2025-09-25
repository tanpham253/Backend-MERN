// wishlist.routes.ts
import { Router } from 'express';
import * as wishlistController from '../../controllers/wishlists.controllers';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import wishlistValidation from '../../validations/wishlist.validation';
import { 
  checkCustomerOwnership, 
  checkCustomerIdOwnership, 
  checkCustomerCreateOwnership 
} from '../../middleware/customerOwnership.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/wishlists', authRoles(["admin", "superadmin"]), wishlistController.findAll);
router.get('/wishlists/customer/:customer_id', validateSchemaYup(wishlistValidation.findByCustomerId), checkCustomerIdOwnership(), wishlistController.findByCustomerId);
router.get('/wishlists/:id', validateSchemaYup(wishlistValidation.findById), checkCustomerOwnership('wishlist'), wishlistController.findById);
router.post('/wishlists', validateSchemaYup(wishlistValidation.create), checkCustomerCreateOwnership(), wishlistController.create);
router.put('/wishlists/:id', validateSchemaYup(wishlistValidation.updateById), checkCustomerOwnership('wishlist'), wishlistController.updateById);
router.delete('/wishlists/:id', validateSchemaYup(wishlistValidation.deleteById), checkCustomerOwnership('wishlist'), wishlistController.deleteById);

export default router;
