const {Product} = require('../models/models')
const ApiError = require("../error/ApiError");
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class ProductController {

    async getAll(req, res, next) {
        try {
            const products = await Product.findAll();
            return res.json(products);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async create(req, res, next) {
        try {
            const {name, price, weight, description, discount, isAvailable = true, categoryId} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".webp";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const product = await Product.create({name, price, weight, description, discount, isAvailable, categoryId, img: fileName});

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.body;
            await Product.destroy({where: {id}});
            return res.json({message: "Успешно удалено"});
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, price, weight, description, discount, isAvailable, categoryId} = req.body;
            const img = req.files?.img;
            const product = await Product.findOne({where: {id}});
            if(!product) {
                return next(ApiError.badRequest("Товар не найден"));
            }
            console.log(name);
            if(name) product.name = name;
            if(price) product.price = price;
            if(weight) product.weight = weight;
            if(description) product.description = description;
            if(discount) product.discount = discount;
            if(isAvailable) product.isAvailable = isAvailable;
            if(categoryId) product.categoryId = categoryId;
            if(img) {
                await fs.rm(path.resolve(__dirname, '..', 'static', product.img), () => {});
                let fileName = uuid.v4() + ".webp";
                await img.mv(path.resolve(__dirname, '..', 'static', fileName));
                product.img = fileName;
            }
            await product.save()//await Product.update(product, {where: {id}});//product.commit();
            /*let fileName = uuid.v4() + ".webp";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));*/
            return res.json({message: "Успешно обновлено"});
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ProductController();