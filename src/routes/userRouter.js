const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({min: 5, max: 32}),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/:id/basket', authMiddleware, userController.getBasketDevices);
router.post('/:id/basket', authMiddleware, userController.addDeviceToBasket);
router.delete('/:id/basket', authMiddleware, userController.deleteDeviceFromBasket);

module.exports = router;