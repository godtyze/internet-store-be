const Router = require('express').Router;
const router = new Router();
const brandController = require('../controllers/brandController');
const roleMiddleware = require('../middleware/RoleMiddleware');

router.post('/', roleMiddleware('ADMIN'),  brandController.create);
router.get('/', brandController.getAll);
router.delete('/', roleMiddleware('ADMIN'), brandController.delete);

module.exports = router;
