const {Cart, CartProduct} = require('../models/models');
const ApiError = require("../error/ApiError");

class CartController {

    async getAll(req, res, next) {
        try {
            const {userId} = req.params;
            const cart = await Cart.findOne({where: {userId: userId}});
            const cartProducts = await CartProduct.findAll({where: {cartId: cart.id}});
            return res.json(cartProducts);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async add(req, res, next) {
        try {
            let {userId, productId, count} = req.body;
            if(!count || count < 1) count = 1;
            const cart = await Cart.findOne({where: {userId: userId}});
            let cartProduct = await CartProduct.findOne({where: {cartId: cart.id, productId: productId}});
            if(cartProduct) {
                cartProduct.count += count;
                if(cartProduct.count > 99) cartProduct.count = 99;
                await cartProduct.save();
            } else {
                await CartProduct.create({cartId: cart.id, count: count, productId: productId});
            }
            const cartProducts = await CartProduct.findAll({where: {cartId: cart.id}});
            return res.json(cartProducts);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async take(req, res, next) {
        try {
            let {userId, productId, count} = req.body;
            if(count < 1) count = 1;
            const cart = await Cart.findOne({where: {userId: userId}});
            let cartProduct = await CartProduct.findOne({where: {cartId: cart.id, productId: productId}});
            if(!cartProduct) {
                return next(ApiError.badRequest("Данный продукт не существует"));
            }
            cartProduct.count -= count;
            if(cartProduct.count < 1) {
                await cartProduct.destroy();
            } else {
                await cartProduct.save();
            }
            const cartProducts = await CartProduct.findAll({where: {cartId: cart.id}});
            return res.json(cartProducts);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const {userId, productId} = req.params;
            const cart = await Cart.findOne({where: {userId: userId}});
            console.log("userId", userId);
            console.log("productId", productId);
            console.log("cart.id", cart.id);
            let cartProduct = await CartProduct.findOne({where: {cartId: cart.id, productId: productId}});
            if(!cartProduct) {
                return next(ApiError.badRequest("Продукт не найден"));
            }
            await cartProduct.destroy();
            const cartProducts = await CartProduct.findAll({where: {cartId: cart.id}});
            return res.json(cartProducts);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeAll(req, res, next) {
        try {
            const {userId} = req.params;
            const cart = await Cart.findOne({where: {userId: userId}});
            const cartProducts = await CartProduct.findAll({where: {cartId: cart.id}});
            await CartProduct.destroy({where: {cartId: cart.id}});
            return res.json(cartProducts);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CartController();