// brand.routes.ts
import { Router } from 'express';
import * as brandController from '../../controllers/brands.controller';

const router = Router();

router.get('/brands', brandController.findAll);
router.get('/brands/:id', brandController.findById);
router.post('/brands', brandController.create);
router.put('/brands/:id', brandController.updateById);
router.delete('/brands/:id', brandController.deleteById);

export default router;
