import { Router } from 'express';
import { ControllerCarts } from '../controllers/controller-cart.js';
import { ControllerTicket } from '../controllers/controller-ticket.js';
import { cartBodyValidation, cartUserValidation } from '../middlewares/cart-validator.js';
import { isAdmin } from '../middlewares/is-admin.js'

const ctrlCarts = new ControllerCarts();
const ctrlTicket = new ControllerTicket();
const router = Router();

router.get('/', isAdmin, ctrlCarts.getCartCtrl)
router.get('/:cid', cartUserValidation, ctrlCarts.getCartByIdCtrl)
router.get('/:cid/tickets', cartUserValidation, ctrlTicket.getUserTicket)
router.put('/:cid/prod/:pid', cartUserValidation, ctrlCarts.addToCartCtrl)
router.put('/:cid/', cartUserValidation, cartBodyValidation, ctrlCarts.updateCartCtrl)
router.delete('/:cid/prod/:pid', cartUserValidation, ctrlCarts.deleteProdFromCartCtrl)
router.delete('/:cid/allprod', cartUserValidation, ctrlCarts.deleteAllProdFromCartCtrl)
router.post('/:cid/checkout', cartUserValidation, ctrlTicket.createTicket)

export default router