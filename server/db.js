const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    {
        dialect: 'sqlite',
        storage: "storage.db",
    }
);