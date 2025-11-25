require('dotenv').config();
require('./models/models');
const {Product, Category} = require('./models/models');
const translit = require('./utils/toTranslit');

const express = require('express');
const {json} = require("express");
const router = require("./routes/index");
const sequelize = require('./db');
const cors = require('cors');
const {createHandler} = require('graphql-http/lib/use/express');
const schema = require('./graphql/schema');
const { ruruHTML } = require("ruru/server");
const root = require('./graphql/root');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path')

const PORT = process.env.PORT || 7000

const app = express();
app.use(cors());
app.use(json());
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }));
})
app.all("/graphql",createHandler({
    schema,
    rootValue: root
}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async() => { // Асинхронный
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await Product.findAll({where: {slug: null}}).then(res => {
            res.forEach(async (model) => {
                model.slug = translit(model.name);
                await model.save();
            })
        });

        await Category.findAll({where: {slug: null}}).then(res => {
            res.forEach(async (model) => {
                model.slug = translit(model.name);
                await model.save();
            })
        });

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {

    }
}

start()

