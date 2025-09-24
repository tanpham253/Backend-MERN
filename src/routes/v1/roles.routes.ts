// roles.routes.ts
import { Router } from 'express';
import * as rolesController from '../../controllers/roles.controller';

const router = Router();

router.get('/roles', rolesController.findAll);
router.get('/roles/:id', rolesController.findById);
router.post('/roles', rolesController.create);
router.put('/roles/:id', rolesController.updateById);
router.delete('/roles/:id', rolesController.deleteById);

export default router;
