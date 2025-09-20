// roles.routes.ts
import { Router } from 'express';
import * as rolesController from '../../controllers/roles.controller';

const router = Router();

router.get('/', rolesController.findAll);
router.get('/:id', rolesController.findById);
router.post('/', rolesController.create);
router.put('/:id', rolesController.updateById);
router.delete('/:id', rolesController.deleteById);

export default router;
