const Router = require('express').Router;
const router = new Router();
const typeController = require('../controllers/typeController')
const roleMiddleware = require('../middleware/RoleMiddleware');

router.post('/', roleMiddleware('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/:id', roleMiddleware('ADMIN'), typeController.delete);
router.put('/:id', roleMiddleware('ADMIN'), typeController.update);

module.exports = router;