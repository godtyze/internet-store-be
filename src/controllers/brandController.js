const brandService = require('../service/brandService');

class BrandController {
  async create(req, res, next) {
    try {
      const {name, typeId} = req.body;
      const brand = await brandService.create(name,typeId);

      return res.json(brand);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params;
      await brandService.delete(id);

      return res.status(200).json({message: `Бренд с id:${id} успешно удален!`});
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const {id} = req.params;
      const {name, typeId} = req.body;
      await brandService.update(id, name, typeId);

      return res.status(200).json({message: `Бренд с id:${id} успешно обновлён!`});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await brandService.getAll();
      return res.json(brands);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BrandController();