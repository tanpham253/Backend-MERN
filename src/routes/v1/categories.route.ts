import express from "express";
const router = express.Router(); //router for module
import categoriesController from "../../controllers/categories.controller";

router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);
router.post("/categories", categoriesController.create);
router.delete("/categories/:id", categoriesController.deleteById);
router.put("/categories/:id", categoriesController.updateById);

export default router;
