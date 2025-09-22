import express from "express";
import customersController from "../../controllers/customers.controller";
import { routeCustomerExample } from "../../middleware/routeExample.middleware";
const router = express.Router();

// middlewares for customers, run through this first
router.use(routeCustomerExample);

// can use multiple middlewares, can use res to pass variable to next middleware
router.get("/customers", customersController.findAll); 
router.get("/customers/:id", customersController.findById); 
router.post("/customers", customersController.create); 
router.delete("/customers/:id", customersController.deleteById); 
router.put("/customers/:id", customersController.updateById); 

export default router;