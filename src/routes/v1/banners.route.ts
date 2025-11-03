import express from "express";
import { BannerController } from "../../controllers/banners.controller";
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';

const router = express.Router();

// CRUD routes
router.get("/banners", BannerController.getAll);
router.get("/banners/:id", BannerController.getById);

router.post("/banners",authenticateToken, authRoles(["admin", "staff"]), BannerController.create);
router.put("/banners/:id",authenticateToken, authRoles(["admin", "staff"]), BannerController.update);
router.delete("/banners/:id",authenticateToken, authRoles(["admin", "staff"]), BannerController.delete);

export default router;
