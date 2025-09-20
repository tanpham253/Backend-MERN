// review.routes.ts
import { Router } from 'express';
import * as reviewController from '../../controllers/reviews.controller';

const router = Router();

router.get('/', reviewController.findAll);
router.get('/:id', reviewController.findById);
router.post('/', reviewController.create);
router.put('/:id', reviewController.updateById);
router.delete('/:id', reviewController.deleteById);

export default router;
