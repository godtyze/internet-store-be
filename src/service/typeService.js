const {Type} = require('../models/models');
const ApiError = require("../error/ApiError");
const brandService = require('./brandService');

class TypeService {
  async create(name) {
    return await Type.create({name});
  }

  async update(id, name) {
    const type = await Type.findByPk(id);
    if (!type) {
      throw ApiError.badRequest(`Тип с id:${id} не найден`);
    }

    await Type.update({name}, {where: { id }});
  }

  async delete(id) {
    const type = await Type.findByPk(id);
    if (!type) {
      throw ApiError.badRequest(`Тип с id:${id} не найден`);
    }

    return await Type.destroy({where: { id }});
  }

  async getAll() {
    const [types, brands] = await Promise.all([Type.findAll(), brandService.getAll()]);

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