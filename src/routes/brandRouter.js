const Router = require('express').Router;
const router = new Router();
const brandController = require('../controllers/brandController')

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.delete('/', brandController.delete);

module.exports = router;
