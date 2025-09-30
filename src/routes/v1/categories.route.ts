import express from "express";
const router = express.Router(); //router for module
import categoriesController from "../../controllers/categories.controller";
import { authenticateToken, authRoles } from "../../middleware/auth.middleware";

router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);

router.post("/categories", authRoles(["admin", "superadmin"]), categoriesController.create);
router.delete("/categories/:id", authRoles(["admin", "superadmin"]), categoriesController.deleteById);
router.put("/categories/:id", authRoles(["admin", "superadmin"]), categoriesController.updateById);

export default router;
