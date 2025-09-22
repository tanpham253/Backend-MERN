// cart.routes.ts
import { Router } from 'express';
import * as cartController from '../../controllers/carts.controller';

const router = Router();

router.get('/cart', cartController.findAll);
router.get('/cart/:id', cartController.findById);
router.post('/cart', cartController.create);
router.put('/cart/:id', cartController.updateById);
router.delete('/cart/:id', cartController.deleteById);

export default router;
