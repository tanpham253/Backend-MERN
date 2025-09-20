// brand.routes.ts
import { Router } from 'express';
import * as brandController from '../../controllers/brand.controller';

const router = Router();

router.get('/', brandController.findAll);
router.get('/:id', brandController.findById);
router.post('/', brandController.create);
router.put('/:id', brandController.updateById);
router.delete('/:id', brandController.deleteById);

export default router;
