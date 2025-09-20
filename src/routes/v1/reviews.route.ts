// review.routes.ts
import { Router } from 'express';
import * as reviewController from '../../controllers/review.controller';

const router = Router();

router.get('/', reviewController.findAll);
router.get('/:id', reviewController.findById);
router.post('/', reviewController.create);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.remove);

export default router;
