// brand.routes.ts
import brandController from '../../controllers/brands.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';

import express from "express";
const router = express.Router();

router.get('/brands', brandController.findAll);
router.get('/brands/:id', brandController.findById);

router.post('/brands', authenticateToken, authRoles(["admin", "staff"]), brandController.create);
router.put('/brands/:id', authenticateToken, authRoles(["admin", "staff"]), brandController.updateById);
router.delete('/brands/:id', authenticateToken, authRoles(["admin", "staff"]), brandController.deleteById);

export default router;
