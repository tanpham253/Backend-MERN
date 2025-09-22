// supplier.routes.ts
import { Router } from 'express';
import * as supplierController from '../../controllers/supplier.controller';

const router = Router();

router.get('/supplier', supplierController.findAll);
router.get('/supplier/:id', supplierController.findById);
router.post('/supplier', supplierController.create);
router.put('/supplier/:id', supplierController.updateById);
router.delete('/supplier/:id', supplierController.deleteById);

export default router;
