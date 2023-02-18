const {Basket, BasketDevice, Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketService {
  async create(userId) {
    return await Basket.create({userId});
  }

  async getBasket(userId) {
    return await Basket.findOne({where: {userId}});
  }

  async addDeviceToBasket(deviceId, basketId) {
    const basketDevices = await this.getBasketDevices(basketId);
    if (basketDevices.rows.some(device => device.id === deviceId)) {
      throw ApiError.badRequest('Данный девайс уже находится в корзине!');
    }

    return await BasketDevice.create({deviceId, basketId});
  }

  async deleteDeviceFromBasket(deviceId, basketId) {
    return await BasketDevice.destroy({where: {deviceId, basketId}});
  }

  async getBasketDevices(basketId) {
    const ids = await BasketDevice.findAndCountAll({where: {basketId}});
    const basketDevices = await Promise.all(
      ids.rows.map(basketDevice => Device.findOne({where: {id: basketDevice.deviceId}}))
    );

    return {
      count: ids.count,
      rows: basketDevices
    };
  }
}

module.exports = new BasketService();