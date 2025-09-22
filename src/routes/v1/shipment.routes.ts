// shipment.routes.ts
import { Router } from 'express';
import * as shipmentController from '../../controllers/shipment.controller';

const router = Router();

router.get('/shipment', shipmentController.findAll);
router.get('/shipment/:id', shipmentController.findById);
router.post('/shipment', shipmentController.create);
router.put('/shipment/:id', shipmentController.updateById);
router.delete('/shipment/:id', shipmentController.deleteById);

export default router;
