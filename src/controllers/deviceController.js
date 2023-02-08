const ApiError = require('../error/ApiError')
const deviceService = require('../service/deviceService')
class DeviceController {
  async create(req, res, next) {
    try {
      const {name, price, brandId, typeId, info} = req.body;
      const {img} = req.files;

      const device = await deviceService.create({name, price, brandId, typeId, img, info});

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const {name} = req.body;
      await deviceService.delete({where: { name }});

      return res.status(200).json({message: `Девайс с именем ${name} успешно удален!`});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const {brandId, typeId, limit, page} = req.query;
      const devices = await deviceService.getAll(brandId, typeId, limit, page);

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