// cart_items.routes.ts
import { Router } from 'express';
import * as cartItemsController from '../../controllers/cart_items.controller';

const router = Router();

router.get('/', cartItemsController.findAll);
router.get('/:id', cartItemsController.findById);
router.post('/', cartItemsController.create);
router.put('/:id', cartItemsController.update);
router.delete('/:id', cartItemsController.remove);

export default router;
