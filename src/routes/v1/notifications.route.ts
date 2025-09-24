// notifications.routes.ts
import { Router } from 'express';
import * as notificationsController from '../../controllers/notifications.controller';

const router = Router();

router.get('/notifications', notificationsController.findAll);
router.get('/notifications/:id', notificationsController.findById);
router.post('/notifications', notificationsController.create);
router.put('/notifications/:id', notificationsController.updateById);
router.delete('/notifications/:id', notificationsController.deleteById);

export default router;
