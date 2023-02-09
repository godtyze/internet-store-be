const Router = require('express').Router;
const router = new Router();
const typeController = require('../controllers/typeController')
const roleMiddleware = require('../middleware/RoleMiddleware');

router.post('/', roleMiddleware('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/', roleMiddleware('ADMIN'), typeController.delete);

module.exports = router;