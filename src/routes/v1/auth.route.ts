import express from "express";
import authController from "../../controllers/auth.controller";
import { authenticateToken } from "../../middleware/auth.middleware"
import { validateSchemaYup } from "../../middleware/validateSchema.middleware";
import authValidation from "../../validations/auth.validation";

const router = express.Router();

router.post('/login', validateSchemaYup(authValidation.login), authController.login)

router.post('/refresh-token', validateSchemaYup(authValidation.refreshToken), authenticateToken, authController.refreshToken)

router.get('/get-profile', authenticateToken, authController.getProfile)

export default router;