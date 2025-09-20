// cart.routes.ts
import { Router } from 'express';
import * as cartController from '../../controllers/cart.controller';

const router = Router();

router.get('/', cartController.findAll);
router.get('/:id', cartController.findById);
router.post('/', cartController.create);
router.put('/:id', cartController.update);
router.delete('/:id', cartController.remove);

export default router;
