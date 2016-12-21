const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id    : { type: Number, index: true },
    title : String,
});

module.exports = mongoose.model('article', ArticleSchema, 'article');