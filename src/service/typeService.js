const {Type} = require('../models/models');

class TypeService {
  async create(name) {
    return await Type.create({name});
  }

  async delete(name) {
    return await Type.destroy({where: { name }});
  }

  async getAll() {
    return await Type.findAll();
  }
}

module.exports = new TypeService();