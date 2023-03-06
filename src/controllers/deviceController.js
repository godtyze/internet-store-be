const ApiError = require('../error/ApiError')
const deviceService = require('../service/deviceService')
class DeviceController {
  async create(req, res, next) {
    try {
      const {name, price, brandId, typeId, info} = req.body;
      const img = req.files?.img;

      const device = await deviceService.create(name, price, brandId, typeId, img, info);

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params;
      await deviceService.delete(id);

      return res.status(200).json({message: `Девайс с id:${id} успешно удален!`});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const {id} = req.params;
      const {name, price, info} = req.body;

      await deviceService.update(id, name, price, info);
      return res.status(200).json({message: `Девайс с id:${id} успешно обновлён!`});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addNewDeviceInfo(req, res, next) {
    try {
      const {id} = req.params;
      const {info} = req.body;

      await deviceService.addNewDeviceInfo(id, info);
      return res.status(200).json({message: `Девайсу с id:${id} успешно добавлена новая характеристика!`});

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const {brandId, typeId, query, limit, page} = req.query;
      const devices = await deviceService.getAll(brandId, typeId, query, limit, page);

      return res.json(devices);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const device = await deviceService.getOne(id);

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DeviceController();