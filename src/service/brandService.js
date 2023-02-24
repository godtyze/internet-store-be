const {Brand} = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandService {
  async create(name, typeId) {
    return await Brand.create({name, typeId});
  }
  async getAll() {
    return await Brand.findAll();
  }

  async update(id, name, typeId) {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw ApiError.badRequest(`Бренд с id:${id} не найден!`)
    }

    await Brand.update({name, typeId}, {where: { id }});
  }

  async delete(id) {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw ApiError.badRequest(`Бренд с id:${id} не найден!`)
    }

    await Brand.destroy({where: { id }});
  }
}

module.exports = new BrandService();