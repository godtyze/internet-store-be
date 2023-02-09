const Router = require('express').Router;
const router = new Router();
const deviceController = require('../controllers/deviceController');
const roleMiddleware = require('../middleware/RoleMiddleware');

router.post('/', roleMiddleware('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.delete('/', roleMiddleware('ADMIN'), deviceController.delete);
router.get('/:id', deviceController.getOne);

module.exports = router;