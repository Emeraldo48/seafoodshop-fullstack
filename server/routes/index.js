const Router = require('express');
const router = new Router();
const userRouter = require('../routes/userRouter');
const productRouter = require('../routes/productRouter');
const categoryRouter = require('../routes/categoryRouter');
const cartRouter = require('../routes/cartRouter');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/carts', cartRouter);

module.exports = router;