// review.routes.ts
import { Router } from 'express';
import * as reviewController from '../../controllers/reviews.controller';

const router = Router();

router.get('/review', reviewController.findAll);
router.get('/review/:id', reviewController.findById);
router.post('/review', reviewController.create);
router.put('/review/:id', reviewController.updateById);
router.delete('/review/:id', reviewController.deleteById);

export default router;
