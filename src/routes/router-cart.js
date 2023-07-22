import { Router } from 'express';
import { ControllerCarts } from '../controllers/controller-cart.js';
import { cartValidator } from '../middlewares/cart-validator.js';

const ctrlCarts = new ControllerCarts();
const router = Router();

router.get('/', ctrlCarts.getCartCtrl)
router.get('/:cid', ctrlCarts.getCartByIdCtrl)
router.post('/', ctrlCarts.createCartCtrl)
router.put('/:cid/prod/:pid', ctrlCarts.addToCartCtrl)
router.put('/:cid/', cartValidator, ctrlCarts.updateCartCtrl)
router.delete('/:cid/prod/:pid', ctrlCarts.deleteProdFromCartCtrl)
router.delete('/:cid/allprod', ctrlCarts.deleteAllProdFromCartCtrl)
router.delete('/:cid', ctrlCarts.deleteCartCtrl)
router.delete('/', ctrlCarts.deleteAllCartCtrl)

export default router