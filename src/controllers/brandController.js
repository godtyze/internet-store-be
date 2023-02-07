const {Brand} = require("../models/models");

class BrandController {
  async create(req, res) {
    const {name} = req.body;
    const brand = await Brand.create({name});

    return res.json(brand)
  }

  async delete(req, res) {
    const {name} = req.body;
    await Brand.destroy({where: { name }});

    return res.status(200).json({message: `brand with name ${name} successfully deleted!`});
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();

    return res.json(brands);
  }
}

module.exports = new BrandController();