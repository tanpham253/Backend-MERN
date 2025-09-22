// brand.routes.ts
import { Router } from 'express';
import * as brandController from '../../controllers/brand.controller';

const router = Router();

router.get('/brand', brandController.findAll);
router.get('/brand/:id', brandController.findById);
router.post('/brand', brandController.create);
router.put('/brand/:id', brandController.updateById);
router.delete('/brand/:id', brandController.deleteById);

export default router;
