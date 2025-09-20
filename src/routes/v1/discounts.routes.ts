// discount.routes.ts
import { Router } from 'express';
import * as discountController from '../../controllers/discount.controller';

const router = Router();

router.get('/', discountController.findAll);
router.get('/:id', discountController.findById);
router.post('/', discountController.create);
router.put('/:id', discountController.updateById);
router.delete('/:id', discountController.deleteById);

export default router;
