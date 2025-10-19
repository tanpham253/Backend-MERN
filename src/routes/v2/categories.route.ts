import express from "express";
const router = express.Router(); //router for module
import categoriesController from "../../controllers/v2/categories.controller";
import { authenticateToken, authRoles } from "../../middleware/auth.middleware";

/** PUBLIC ROUTES */
router.get("/categories/tree", categoriesController.getCategoryTree);

router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);

router.post("/categories", authenticateToken, authRoles(["admin", "staff"]), categoriesController.create);
router.delete("/categories/:id", authenticateToken, authRoles(["admin", "staff"]), categoriesController.deleteById);
router.put("/categories/:id", authenticateToken, authRoles(["admin", "staff"]), categoriesController.updateById);

export default router;
