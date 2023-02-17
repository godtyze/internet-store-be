const {Brand} = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandService {
  async create(name) {
    return await Brand.create({name});
  }
  async getAll() {
    return await Brand.findAll();
  }

  async delete(name) {
    const brand = await Brand.findOne({where: { name }});
    if (!brand) {
      throw ApiError.badRequest(`Бренд с именем ${name} не найден!`)
    }

    await Brand.destroy({where: { name }});
  }
}

module.exports = new BrandService();