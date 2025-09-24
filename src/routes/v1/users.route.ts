// users.routes.ts
import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import userValidation from '../../validations/user.validation';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
// console.log('validateSchemaYup:', validateSchemaYup);
const router = Router();

// all routes below use authenticate
router.use(authenticateToken);

router.get('/users', usersController.findAll);
// router.get('/users/:id', authenticateToken, authRoles(["admin"]), validateSchemaYup(userValidation.findById), usersController.findById);
router.get('/users/:id', authRoles(["admin"]), validateSchemaYup(userValidation.findById), usersController.findById);
router.post('/users',validateSchemaYup(userValidation.create), usersController.create);
router.put('/users/:id', validateSchemaYup(userValidation.updateById),usersController.updateById);
router.delete('/users/:id', usersController.deleteById);

export default router;
