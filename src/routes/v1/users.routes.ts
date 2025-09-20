// users.routes.ts
import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';

const router = Router();

router.get('/', usersController.findAll);
router.get('/:id', usersController.findById);
router.post('/', usersController.create);
router.put('/:id', usersController.updateById);
router.delete('/:id', usersController.deleteById);

export default router;
