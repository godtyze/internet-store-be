const {Type} = require('../models/models');
const ApiError = require("../error/ApiError");

class TypeService {
  async create(name) {
    return await Type.create({name});
  }

  async delete(name) {
    const type = await Type.findOne({where: { name }});
    if (!type) {
      throw ApiError.badRequest(`Тип с названием ${name} не найден`);
    }

    return await Type.destroy({where: { name }});
  }

  async getAll() {
    return await Type.findAll();
  }
}

module.exports = new TypeService();