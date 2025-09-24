// inventory.routes.ts
import { Router } from 'express';
import * as inventoryController from '../../controllers/inventory.controller';

const router = Router();

router.get('/inventory', inventoryController.findAll);
router.get('/inventory/:id', inventoryController.findById);
router.post('/inventory', inventoryController.create);
router.put('/inventory/:id', inventoryController.updateById);
router.delete('/inventory/:id', inventoryController.deleteById);

export default router;
