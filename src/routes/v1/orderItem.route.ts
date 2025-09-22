// order_items.routes.ts
import { Router } from 'express';
import * as orderItemsController from '../../controllers/orderItem.controller';

const router = Router();

router.get('/orderItems', orderItemsController.findAll);
router.get('/orderItems/:id', orderItemsController.findById);
router.post('/orderItems', orderItemsController.create);
router.put('/orderItems/:id', orderItemsController.updateById);
router.delete('/orderItems/:id', orderItemsController.deleteById);

export default router;
