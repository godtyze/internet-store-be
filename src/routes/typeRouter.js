const Router = require('express').Router;
const router = new Router();
const typeController = require('../controllers/typeController')

router.post('/', typeController.create);
router.get('/', typeController.getAll);
router.delete('/', typeController.delete);

module.exports = router;