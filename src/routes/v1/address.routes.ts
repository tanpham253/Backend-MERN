// address.routes.ts
import { Router } from 'express';
import addressController from '../../controllers/address.controller';

const router = Router();

router.get('/', addressController.findAll);
router.get('/:id', addressController.findById);
router.post('/', addressController.create);
router.put('/:id', addressController.updateById);
router.delete('/:id', addressController.deleteById);

export default router;
