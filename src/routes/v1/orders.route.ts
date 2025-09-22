// orders.routes.ts
import { Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';

const router = Router();

router.get('/orders', ordersController.findAll);
router.get('/orders/:id', ordersController.findById);
router.post('/orders', ordersController.create);
router.put('/orders/:id', ordersController.updateById);
router.delete('/orders/:id', ordersController.deleteById);

export default router;
