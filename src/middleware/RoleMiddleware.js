const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');
module.exports = (role) => {
  return (req, res, next) => {
    try {
      if (req.method === 'OPTIONS') {
        next();
      }
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

      if (userData.role !== role) {
        return next(ApiError.forbidden('Нет доступа!'));
      }

      req.user = userData;
      next();
    } catch (e) {
      return next(ApiError.unauthorized('Пользователь не авторизован!'));
    }
  }
}