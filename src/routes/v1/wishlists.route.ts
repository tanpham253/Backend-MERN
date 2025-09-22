// wishlist.routes.ts
import { Router } from 'express';
import * as wishlistController from '../../controllers/wishlists.controllers';

const router = Router();

router.get('/wishlist', wishlistController.findAll);
router.get('/wishlist/:id', wishlistController.findById);
router.post('/wishlist', wishlistController.create);
router.put('/wishlist/:id', wishlistController.updateById);
router.delete('/wishlist/:id', wishlistController.deleteById);

export default router;
