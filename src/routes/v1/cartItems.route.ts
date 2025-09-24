// cart_items.routes.ts
import { Router } from 'express';
import * as cartItemsController from '../../controllers/cartItem.controller';

const router = Router();

router.get('/cartItems', cartItemsController.findAll);
router.get('/cartItems/:id', cartItemsController.findById);
router.post('/cartItems', cartItemsController.create);
router.put('/cartItems/:id', cartItemsController.updateById);
router.delete('/cartItems/:id', cartItemsController.deleteById);

export default router;
