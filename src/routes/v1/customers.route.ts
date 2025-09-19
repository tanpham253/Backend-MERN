import express from "express";
const router = express.Router();
import customersController from "../../controllers/customers.controller";

router.get("/customers", customersController.findAll); 
router.get("/customers/:id", customersController.findById); 
router.post("/customers", customersController.create); 
router.delete("/customers/:id", customersController.deleteById); 
router.put("/customers/:id", customersController.updateById); 

export default router;