// inventory.routes.ts
import { Router } from 'express';
import * as inventoryController from '../../controllers/inventory.controller';

const router = Router();

router.get('/', inventoryController.findAll);
router.get('/:id', inventoryController.findById);
router.post('/', inventoryController.create);
router.put('/:id', inventoryController.updateById);
router.delete('/:id', inventoryController.deleteById);

export default router;
