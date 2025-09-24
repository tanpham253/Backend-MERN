// audit_log.routes.ts
import { Router } from 'express';
import * as audit_logController from '../../controllers/audit_log.controller';

const router = Router();

router.get('/audit_log', audit_logController.findAll);
router.get('/audit_log/:id', audit_logController.findById);
router.post('/audit_log', audit_logController.create);
router.put('/audit_log/:id', audit_logController.updateById);
router.delete('/audit_log/:id', audit_logController.deleteById);

export default router;
