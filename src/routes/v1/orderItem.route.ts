// order_items.routes.ts
import { Router } from 'express';
import * as orderItemsController from '../../controllers/orderItem.controller';

const router = Router();

router.get('/', orderItemsController.findAll);
router.get('/:id', orderItemsController.findById);
router.post('/', orderItemsController.create);
router.put('/:id', orderItemsController.update);
router.delete('/:id', orderItemsController.remove);

export default router;
