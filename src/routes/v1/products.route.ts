import express from "express";
const router = express.Router(); 
import productsController from "../../controllers/products.controller";

router.get("/products", productsController.findAll); 
router.get("/products/:id", productsController.findById); 
router.post("/products", productsController.create); 
router.delete("/products/:id", productsController.deleteById); 
router.put("/products/:id", productsController.updateById); 

export default router;