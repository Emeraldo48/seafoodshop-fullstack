const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge');
const {makeExecutableSchema} = require("@graphql-tools/schema");

const typesArray = loadFilesSync(path.join(__dirname, './schemas'), { extensions: ['graphql'] });

const mergedSchema = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({ typeDefs: mergedSchema });

module.exports = schema