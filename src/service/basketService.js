const {Basket, BasketDevice} = require('../models/models');

class BasketService {
  async create(userId) {
    return await Basket.create({userId});
  }

  async getBasket(userId) {
    return await Basket.findOne({where: {userId}});
  }

  async addToBasket(deviceId, basketId) {
    return await BasketDevice.create({})
  }

  async getBasketDevices(basketId) {
    return await BasketDevice.findAll({where: {basketId}});
  }
}

module.exports = new BasketService();