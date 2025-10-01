import express from "express";
const router = express.Router(); 
import productsController from "../../controllers/products.controller";
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import productValidation from '../../validations/product.validation';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';

/** PUBLIC ROUTES */
// GET /api/v1/products/home/:catId?limit=5
router.get('/products/home/:catId', productsController.findHomeProducts);
// GET /api/v1/products/category/:slug
router.get('/products/category/:slug', productsController.getProductsByCategorySlug);

// products for home page
router.get('/products/home', productsController.findHomeProducts);

router.get("/products", productsController.findAll); 
router.get("/products/:id", validateSchemaYup(productValidation.findById), productsController.findById); 

router.post("/products", productsController.create); 
router.delete("/products/:id", productsController.deleteById); 
router.put("/products/:id", productsController.updateById); 

export default router;