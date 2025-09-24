// discount.routes.ts
import { Router } from 'express';
import * as discountController from '../../controllers/discount.controller';

const router = Router();

router.get('/discount', discountController.findAll);
router.get('/discount/:id', discountController.findById);
router.post('/discount', discountController.create);
router.put('/discount/:id', discountController.updateById);
router.delete('/discount/:id', discountController.deleteById);

export default router;
