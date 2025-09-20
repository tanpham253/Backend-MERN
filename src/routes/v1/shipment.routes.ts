// shipment.routes.ts
import { Router } from 'express';
import * as shipmentController from '../../controllers/shipment.controller';

const router = Router();

router.get('/', shipmentController.findAll);
router.get('/:id', shipmentController.findById);
router.post('/', shipmentController.create);
router.put('/:id', shipmentController.updateById);
router.delete('/:id', shipmentController.deleteById);

export default router;
