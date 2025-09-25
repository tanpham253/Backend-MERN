import express from "express";
const router = express.Router(); 
import productsController from "../../controllers/products.controller";
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import productValidation from '../../validations/product.validation';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';

router.get("/products", productsController.findAll); 
router.get("/products/:id", validateSchemaYup(productValidation.findById), productsController.findById); 

// all routes below use authenticate
router.use(authenticateToken);

router.post("/products", authRoles(["admin", "superadmin"]), validateSchemaYup(productValidation.create), productsController.create); 
router.delete("/products/:id", authRoles(["admin", "superadmin"]), validateSchemaYup(productValidation.deleteById), productsController.deleteById); 
router.put("/products/:id", authRoles(["admin", "superadmin"]), validateSchemaYup(productValidation.updateById), productsController.updateById); 

export default router;