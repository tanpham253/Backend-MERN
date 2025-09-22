// payment.routes.ts
import { Router } from 'express';
import * as paymentController from '../../controllers/payment.controller';

const router = Router();

router.get('/payment', paymentController.findAll);
router.get('/payment/:id', paymentController.findById);
router.post('/payment', paymentController.create);
router.put('/payment/:id', paymentController.updateById);
router.delete('/payment/:id', paymentController.deleteById);

export default router;
