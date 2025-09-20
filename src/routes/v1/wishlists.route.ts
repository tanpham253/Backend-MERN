// wishlist.routes.ts
import { Router } from 'express';
import * as wishlistController from '../../controllers/wishlists.controllers';

const router = Router();

router.get('/', wishlistController.findAll);
router.get('/:id', wishlistController.findById);
router.post('/', wishlistController.create);
router.put('/:id', wishlistController.updateById);
router.delete('/:id', wishlistController.deleteById);

export default router;
