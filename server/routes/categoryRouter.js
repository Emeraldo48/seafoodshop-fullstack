const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/CategoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), CategoryController.create);
router.delete('/', checkRole('ADMIN'), CategoryController.remove);
router.patch('/', checkRole('ADMIN'), CategoryController.update);

module.exports = router;