const jwt = require('jsonwebtoken');
const {Token} = require('../models/models');
class TokenService {
  generateTokens(payload) {
    const accessToken =  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '4h',
    });
    const refreshToken =  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({where: {userId}});
    if (tokenData) {
      return await Token.update({refreshToken}, {where: {userId}});
    }

    const token = await Token.create({userId, refreshToken});

    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    return await Token.findOne({where: {refreshToken: refreshToken}});
  }

  async removeToken(refreshToken) {
    await Token.destroy({where: {refreshToken: refreshToken}});
  }
}

module.exports = new TokenService();