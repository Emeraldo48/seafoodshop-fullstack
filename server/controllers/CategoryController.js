const ApiError = require('../error/ApiError');
const {Category} = require('../models/models');
const toTranslit = require('../utils/toTranslit');

class CategoryController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const checkCategory = await Category.findOne({where: {name}});
            if(checkCategory) {
                return next(ApiError.badRequest('Категория с таким именем уже существует'))
            }
            const category = await Category.create({name, slug: toTranslit(name)});
            return res.json(category);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.body;
            const category = await Category.findOne({where: {id}});
            if(!category) {
                return next(ApiError.badRequest('Категория отсутствует'));
            }
            await Category.destroy({where: {id}});
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body;
            const category = await Category.findOne({where: {id}});
            if(!category) {
                return next(ApiError.badRequest('Категория отсутствует'));
            }
            await Category.update({name}, {where: {id}});
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CategoryController();