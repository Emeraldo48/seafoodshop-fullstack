const Router = require('express');
const router = Router();
const CartController = require('../controllers/CartController');

router.get('/:userId', CartController.getAll);
router.post('/', CartController.add);
router.patch('/', CartController.take);
router.delete('/:userId/:productId', CartController.remove);
router.delete('/:userId', CartController.removeAll);

module.exports = router;