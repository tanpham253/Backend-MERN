import { Router } from 'express';
import productController from '../../controllers/products.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

//import multer vào
import multer from "multer";
import path from 'path';
import { buildSlug, buildSlugify } from '../../helper/buildSlug.helper';
// Khởi tạo multer với cấu hình lưu trữ
const storage = multer.diskStorage({

    //cấu hình vị trí lưu file
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  //handle tên file sau khi upload lên
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    //custom file name
    const pathInfo = path.parse(file.originalname);

    console.log('<<=== 🚀 pathInfo ===>>', pathInfo);

    cb(null, buildSlugify(pathInfo.name) + '-' + uniqueSuffix + pathInfo.ext)
    //bi.png-1234567890
    //bi-1234567890.png
  }
})

const upload = multer({ storage: storage })


const router = Router();

/** PUBLIC ROUTES */

router.get("/products/best-sellers", productController.getBestSellers);
// GET /api/v1/products/home/:catId?limit=5
router.get('/products/home/:catId', productController.findHomeProducts);
// GET /api/v1/products/category/:slug
router.get('/products/category/:slug', productController.getProductsByCategorySlug);
// GET /api/v1/products/:slug
router.get('/products/slug/:slug', productController.findBySlug);

router.get("/products/latest", productController.getLatestProducts);
/** PRIVATE ROUTES */
router.get('/products', productController.findAll);
router.get('/products/:id', productController.findById);

// POST /api/v1/products
router.post('/products', upload.single('file'), productController.create);

// PUT /api/v1/products/:id
router.put('/products/:id', productController.updateById);

// DELETE /api/v1/products/:id
router.delete('/products/:id', productController.deleteById);

router.post('/products/upload-single', upload.single('file'), productController.uploadSingle);

export default router;