import express from "express";
import customersController from "../../controllers/customers.controller";
import { routeCustomerExample } from "../../middleware/routeExample.middleware";
import { authenticateToken, authRoles } from "../../middleware/auth.middleware";
import { validateSchemaYup } from "../../middleware/validateSchema.middleware";
import customerValidation from "../../validations/customer.validation";
// import { canAccessAddressById } from "../../middleware/customerAuth.middleware";
const router = express.Router();

// can use multiple middlewares, can use res to pass variable to next middleware
router.get("/customers", validateSchemaYup(customerValidation.findAll), customersController.findAll); 
router.get("/customers/:id", validateSchemaYup(customerValidation.findById), customersController.findById); 
router.post("/customers", validateSchemaYup(customerValidation.create), customersController.create); 
router.delete("/customers/:id", validateSchemaYup(customerValidation.deleteById), customersController.deleteById); 
router.put("/customers/:id", validateSchemaYup(customerValidation.updateById), customersController.updateById);

export default router;