// cart_items.routes.ts
import { Router } from 'express';
import * as cartItemsController from '../../controllers/cartItem.controller';

const router = Router();

router.get('/', cartItemsController.findAll);
router.get('/:id', cartItemsController.findById);
router.post('/', cartItemsController.create);
router.put('/:id', cartItemsController.updateById);
router.delete('/:id', cartItemsController.deleteById);

export default router;
