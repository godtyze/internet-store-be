const {Type} = require('../models/models');
const ApiError = require("../error/ApiError");
const brandService = require('./brandService');

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
    const types = await Type.findAll();
    const brands = await brandService.getAll();

    const result = types.map(type => {
      const childBrands = [];
      brands.forEach(brand => {
        if (brand.typeId.includes(type.id)) {
          childBrands.push({ id: brand.id, name: brand.name });
        }
      });

      return {
        id: type.id,
        name: type.name,
        childBrands
      }
    });

    return result;
  }
}

module.exports = new TypeService();