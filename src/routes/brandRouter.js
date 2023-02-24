const Router = require('express').Router;
const router = new Router();
const brandController = require('../controllers/brandController');
const roleMiddleware = require('../middleware/RoleMiddleware');

router.post('/', roleMiddleware('ADMIN'),  brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', roleMiddleware('ADMIN'), brandController.delete);
router.put('/:id', roleMiddleware('ADMIN'), brandController.update);

module.exports = router;
