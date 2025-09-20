// discount.routes.ts
import { Router } from 'express';
import * as discountController from '../../controllers/discount.controller';

const router = Router();

router.get('/', discountController.findAll);
router.get('/:id', discountController.findById);
router.post('/', discountController.create);
router.put('/:id', discountController.update);
router.delete('/:id', discountController.remove);

export default router;
