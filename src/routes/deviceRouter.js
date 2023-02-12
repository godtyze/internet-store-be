const Router = require('express').Router;
const router = new Router();
const deviceController = require('../controllers/deviceController');
const roleMiddleware = require('../middleware/RoleMiddleware');

router.post('/', roleMiddleware('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.post('/:id', roleMiddleware('ADMIN'), deviceController.addNewDeviceInfo);
router.put('/:id', roleMiddleware('ADMIN'), deviceController.update);
router.delete('/:id', roleMiddleware('ADMIN'), deviceController.delete);

module.exports = router;