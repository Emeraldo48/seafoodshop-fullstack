const Router = require('express');
const router = new Router();
const productController = require('../controllers/ProductController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', productController.getAll);
router.post('/', checkRole('ADMIN'), productController.create);
router.delete('/', checkRole('ADMIN'), productController.remove);
router.patch('/', checkRole('ADMIN'), productController.update);

module.exports = router;