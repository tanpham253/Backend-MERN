// users.routes.ts
import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import userValidation from '../../validations/user.validation';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
// console.log('validateSchemaYup:', validateSchemaYup);
const router = Router();

router.post('/users', usersController.create);

// all routes below use authenticate
// router.use(authenticateToken);

// router.get('/users', usersController.findAll);
// router.get('/users/:id', authenticateToken, authRoles(["admin"]), validateSchemaYup(userValidation.findById), usersController.findById);
// router.get('/users/:id', authRoles(["admin", "superadmin"]), validateSchemaYup(userValidation.findById), usersController.findById);
// router.post('/users', authRoles(["admin", "superadmin"]),validateSchemaYup(userValidation.create), usersController.create);
// router.put('/users/:id', authRoles(["admin", "superadmin"]), validateSchemaYup(userValidation.updateById),usersController.updateById);
// router.delete('/users/:id', authRoles(["admin", "superadmin"]), validateSchemaYup(userValidation.deleteById), usersController.deleteById);

export default router;
