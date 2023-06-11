import { Router } from 'express'
const router = Router();

router.get('/index', async (req, res) => {
    res.render('index')
});

router.get('/products-realtime', async (req, res) => {
    res.render('products-realtime')
});

router.get('/products-static', async (req, res) => {
    res.render('products-static')
});

export default router;