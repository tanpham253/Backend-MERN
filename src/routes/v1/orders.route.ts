// orders.routes.ts
import { Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';

const router = Router();

router.get('/', ordersController.findAll);
router.get('/:id', ordersController.findById);
router.post('/', ordersController.create);
router.put('/:id', ordersController.updateById);
router.delete('/:id', ordersController.deleteById);

export default router;
