// notifications.routes.ts
import { Router } from 'express';
import * as notificationsController from '../../controllers/notifications.controller';

const router = Router();

router.get('/', notificationsController.findAll);
router.get('/:id', notificationsController.findById);
router.post('/', notificationsController.create);
router.put('/:id', notificationsController.updateById);
router.delete('/:id', notificationsController.deleteById);

export default router;
