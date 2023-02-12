const ApiError = require('../error/ApiError');
const {validationResult} = require('express-validator');
const userService = require('../service/userService');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации'));
      }

      const {email, password, role} = req.body;
      const userData = await userService.registration(email, password, role);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json({message: 'Логаут успешно выполнен!'});
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      await userService.refresh(refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).json({message: 'Логаут успешно выполнен!'});
    } catch (e) {
      next(e);
    }
  }

  async getBasketDevices(req, res, next) {
    try {
      const {id} = req.params;
      const basketDevices = await userService.getBasketDevices(id);

      return res.json(basketDevices);
    } catch (e) {
      next(e);
    }
  }

  async addDeviceToBasket(req, res, next) {
    try {
      const {deviceId} = req.body;
      const {id} = req.params;

      await userService.addDeviceToBasket(deviceId, id);
      return res.status(200).json({message: `Товар c id:${deviceId} успешно добавлен в корзину пользователя с id:${id}!`});
    } catch (e) {
      next(e);
    }
  }

  async deleteDeviceFromBasket(req, res, next) {
    try {
      const {deviceId} = req.body;
      const {id} = req.params;

      await userService.deleteDeviceFromBasket(deviceId, id);
      return res.status(200).json({message: `Товар с id:${deviceId} успешно удален из корзины пользователя с id:${id}!`});
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();