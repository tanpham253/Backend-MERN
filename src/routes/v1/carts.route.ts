// cart.routes.ts
import { Router } from 'express';
import * as cartController from '../../controllers/carts.controller';

const router = Router();

router.get('/', cartController.findAll);
router.get('/:id', cartController.findById);
router.post('/', cartController.create);
router.put('/:id', cartController.updateById);
router.delete('/:id', cartController.deleteById);

export default router;
