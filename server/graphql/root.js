const {Product, CartProduct, Category} = require('../models/models');

const root = {
    async getProducts() {
        return {
            count: await Product.count(),
            products: await Product.findAll()
        };
    },
    createProduct: async ({input}) => {
        const {name, price, description, categoryId} = input;
        return await Product.create({name, price, description, categoryId});
    },
    async getCategories() {
        return await Category.findAll();
    },
    async createCategory({name}) {
        return await Category.create({name});
    },
    async getProductsInCategory({id}) {
        return await Product.findAll({where: {categoryId: id}});
    },
    async removeCategory({id}) {
        const category = await Category.findOne({where:{id}});
        await Category.destroy({where:{id}})
        return category;
    },
    async removeProduct({id}) {
        const product = await Product.findOne({where:{id}});
        await Product.destroy({where:{id}})
        return product;
    }
}

module.exports = root;