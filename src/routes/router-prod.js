import { Router } from 'express';
import { ControllerProducts } from '../controllers/controller-prod.js';
import { productValidator } from '../middlewares/product-validator.js';
const ctrlProducts = new ControllerProducts();

const router = Router();

router.get('/', ctrlProducts.getProdCtrl)
router.get('/:pid', ctrlProducts.getProdByIdCtrl)
router.post('/', productValidator, ctrlProducts.addProdCtrl)
router.put('/:pid', productValidator, ctrlProducts.updateProdCtrl)
router.delete('/:pid', ctrlProducts.deleteProdCtrl)
router.delete('/', ctrlProducts.deleteAllProdCtrl)

export default router