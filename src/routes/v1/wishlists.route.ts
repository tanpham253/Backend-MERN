// wishlist.routes.ts
import { Router } from 'express';
import * as wishlistController from '../../controllers/wishlist.controller';

const router = Router();

router.get('/', wishlistController.findAll);
router.get('/:id', wishlistController.findById);
router.post('/', wishlistController.create);
router.put('/:id', wishlistController.update);
router.delete('/:id', wishlistController.remove);

export default router;
