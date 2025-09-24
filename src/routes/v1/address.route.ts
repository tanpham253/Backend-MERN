// address.routes.ts
import { Router } from 'express';
import addressController from '../../controllers/address.controller';

const router = Router();

router.get('/address', addressController.findAll);
router.get('/address/:id', addressController.findById);
router.post('/address', addressController.create);
router.put('/address/:id', addressController.updateById);
router.delete('/address/:id', addressController.deleteById);

export default router;
