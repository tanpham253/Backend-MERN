// payment.routes.ts
import { Router } from 'express';
import * as paymentController from '../../controllers/payment.controller';

const router = Router();

router.get('/', paymentController.findAll);
router.get('/:id', paymentController.findById);
router.post('/', paymentController.create);
router.put('/:id', paymentController.updateById);
router.delete('/:id', paymentController.deleteById);

export default router;
