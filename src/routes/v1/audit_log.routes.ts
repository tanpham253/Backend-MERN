// audit_log.routes.ts
import { Router } from 'express';
import * as audit_logController from '../../controllers/audit_log.controller';

const router = Router();

router.get('/', audit_logController.findAll);
router.get('/:id', audit_logController.findById);
router.post('/', audit_logController.create);
router.put('/:id', audit_logController.updateById);
router.delete('/:id', audit_logController.deleteById);

export default router;
