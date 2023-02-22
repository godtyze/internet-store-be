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
      const {name} = req.body;
      await brandService.delete(name);

      return res.status(200).json({message: `Бренд с именем ${name} успешно удален!`});
    } catch (e) {
      next(e)
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