import express from "express";
import brandController from "../../controllers/brands.controller";

const router = express.Router();

// GET /api/v2/brands?page=&limit=&keyword=
router.get("/brands", brandController.findAllV2);

export default router;
