const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');

module.exports = (req, res, next) => {
  try {
    const {id} = req.params;
    const header = req.headers.authorization;
    if (!header) {
      return next(ApiError.unauthorized('Пользователь не авторизован!'));
    }

    const accessToken = header.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.unauthorized('Пользователь не авторизован!'));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorized('Пользователь не авторизован!'));
    }

    if (+userData.id !== +id) {
      return next(ApiError.forbidden('У вас нет доступа к данной корзине!'));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorized('Пользователь не авторизован!'));
  }
}