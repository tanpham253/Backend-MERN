import { Router } from 'express';
import bannerSlidesController from '../../controllers/bannerSlides.controller';
import { authenticateToken, authRoles } from '../../middleware/auth.middleware';
import { validateSchemaYup } from '../../middleware/validateSchema.middleware';
import bannerValidation from '../../validations/banner.validation';

const router = Router();

router.get('/banner-slides', bannerSlidesController.findAll);
router.get(
  '/banner-slides/:id',
  validateSchemaYup(bannerValidation.findById),
  bannerSlidesController.findById
);

router.post(
  '/banner-slides',
  authenticateToken,
  authRoles(['admin', 'staff']),
  validateSchemaYup(bannerValidation.create),
  bannerSlidesController.create
);

router.put(
  '/banner-slides/:id',
  authenticateToken,
  authRoles(['admin', 'staff']),
  validateSchemaYup(bannerValidation.updateById),
  bannerSlidesController.updateById
);

router.delete(
  '/banner-slides/:id',
  authenticateToken,
  authRoles(['admin', 'staff']),
  validateSchemaYup(bannerValidation.deleteById),
  bannerSlidesController.deleteById
);

export default router;
