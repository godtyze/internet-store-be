const {Brand} = require("../models/models");

class BrandService {
  async create(name) {
    return await Brand.create({name});
  }
  async getAll() {
    return await Brand.findAll();
  }

  async delete(name) {
    await Brand.destroy({where: { name }});
  }
}

module.exports = new BrandService();