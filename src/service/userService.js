const bcrypt = require('bcrypt');
const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const tokenService = require('./tokenService');
const basketService = require('./basketService');
const UserDto = require('../dtos/userDto');
class UserService {
  async registration(email, password, role) {
      const candidate = await User.findOne({where: {email}});
      if (candidate) {
        throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует!`);
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({email, password: hashPassword, role});
      await basketService.create(user.id);

      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {...tokens, user: userDto};
  }

  async login(email, password) {
    const user = await User.findOne({where: {email}});
    if (!user) {
      throw ApiError.badRequest('Пользователь с таким email не найден!');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest('Неправильный пароль!');
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized('Пользователь не авторизован!');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.unauthorized('Пользователь не авторизован!');
    }

    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async getBasket(userId) {
    return await basketService.getBasket(userId);
  }
}

module.exports = new UserService();