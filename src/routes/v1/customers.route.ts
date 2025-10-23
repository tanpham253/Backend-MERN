import express from "express";
import customersController from "../../controllers/customers.controller";
// import { routeCustomerExample } from "../../middleware/routeExample.middleware";

// import authController from "../../controllers/auth.controller";
import { customerAuthenticateToken } from "../../middleware/customerAuth.middleware"
// import { canAccessAddressById } from "../../middleware/customerAuth.middleware";
const router = express.Router();

router.post('/customers/login', customersController.login)
router.post('/customers/refresh-token', customerAuthenticateToken, customersController.refreshToken)
router.get('/customers/profile', customerAuthenticateToken, customersController.getProfile)

// can use multiple middlewares, can use res to pass variable to next middleware
router.get("/customers", customersController.findAll); 
router.get("/customers/:id", customersController.findById); 
router.post("/customers", customersController.create); 
router.delete("/customers/:id", customersController.deleteById); 
router.put("/customers/:id", customersController.updateById);

export default router;