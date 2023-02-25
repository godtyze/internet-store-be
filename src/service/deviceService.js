const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Op} = require('sequelize');
const {unlink} = require('fs');
class DeviceService {
  async create(name, price, brandId, typeId, img, info) {
      const fileName = uuid.v4() + '.jpg';

      await img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

      const device = await Device.create({name, price, brandId, typeId, img: fileName});

      if (info) {
        info = JSON.parse(info);
        info.forEach(i => DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id
        }));
      }

      return device;
  }

  async addNewDeviceInfo(id, info) {
    info.forEach(i => DeviceInfo.create({title: i.title, description: i.description, deviceId: id}));
  }

  async update(id, name, price, info) {
    const device = await Device.findByPk(id);
    if (!device) {
      throw ApiError.badRequest(`Девайс с id:${id} не найден!`);
    }
    await Device.update({name, price}, {where: { id }});

    if (info) {
      info.forEach(i => DeviceInfo.update({title: i.newTitle, description: i.newDescription},
        {where: {deviceId: id, title: i.title}}));
    }
  }

  async delete(id) {
    const device = await Device.findOne({where: {id}});
    if (!device) {
      throw ApiError.badRequest(`Девайс с id:${id} не найден!`);
    }

    await DeviceInfo.destroy({where: {deviceId: id}});
    await Device.destroy({where: { id }});
    unlink(path.resolve(__dirname, '..', '..', 'static', device.img), (err) => {
      if (err) throw err;
    });
  }

  async getAll(brandId, typeId, query, limit, page) {
    limit = limit || 9;
    page = page || 1;
    const offset = page * limit - limit;
    brandId = brandId?.split('-');
    typeId = typeId?.split('-');
    const options = {
      where: {
        ...(typeId && {typeId}),
        ...(brandId && {brandId}),
        ...(query && {name: { [Op.iLike]: `%${query}%` }})
      },
      limit,
      offset
    };

    return await Device.findAndCountAll(options);
  }

  async getOne(id) {
    return await Device.findOne({
      where: {id},
      include: [{model: DeviceInfo, as: 'info'}]
    });
  }
}

module.exports = new DeviceService();