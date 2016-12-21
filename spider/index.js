const request = require("request");
const cheerio = require("cheerio");

require('../db/index.js');

const config = require('../config/index.js');
const ArticleModel = require('../db/models/article.js');

// const instance = new ArticleModel();



const pullArticle = async () => {
    const html = await new Promise((resolve, reject) => {
        request.get(config.url, (err, response, body) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const $ = cheerio.load(body);
                const articleValue = getArticleValue($);
                articleValue.map((item, index) => {
                    const f = ArticleModel.findOne({title: item.title}, (err, data) => {
                        if (!data) {
                            const instance = new ArticleModel(Object.assign({id: index}, item));
                            instance.save();
                        }
                    });
                })

                resolve(articleValue);
            }
        })
    })

    return html
}

const getArticleValue = ($) => {
    const arr = [];
    $('div.main.article>ul.list.list-article>li.item.type-big').each(function() {
        const title = $(this).find('div.ha>h2.title>a').text();
        arr.push({title});
    })

    return arr
}

module.exports = {
    pullArticle
};

