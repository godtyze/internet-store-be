const typeService = require('../service/typeService');

class TypeController {
  async create(req, res, next) {
    try {
      const {name} = req.body;
      const type = await typeService.create(name);

      return res.json(type)
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const {id} = req.params;
      const {name} = req.body;
      await typeService.update(id, name);

      return res.status(200).json({message: `Тип с id:${id} успешно обновлён!`});
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params;
      await typeService.delete(id);

      return res.status(200).json({message: `Тип с id:${id} успешно удален!`});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await typeService.getAll();

      return res.json(types);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TypeController();