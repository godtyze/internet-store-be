const Router = require('express').Router;
const router = new Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.delete('/', deviceController.delete);
router.get('/:id', deviceController.getOne);

module.exports = router;