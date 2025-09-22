// users.routes.ts
import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import userValidation from '../../validations/user.validation';
// console.log('validateSchemaYup:', validateSchemaYup);
const router = Router();

router.get('/users', usersController.findAll);
router.get('/users/:id', validateSchemaYup(userValidation.findById), usersController.findById);
router.post('/users',validateSchemaYup(userValidation.create), usersController.create);
router.put('/users/:id', validateSchemaYup(userValidation.updateById),usersController.updateById);
router.delete('/users/:id', usersController.deleteById);

export default router;
