const { fetchTopics, fetchArticles, fetchArticleId, fetchComments } = require('../models/topics.model.js');
const endpoints = require('../endpoints.json');

exports.getTopics = (req, res, next) => {
    const path = req.route.path;
    fetchTopics(path).then((result) => {
        res.status(200).send({topics: result.rows});
    })
    .catch((err) => {
        next(err);
    })
}
exports.getArticleId = (req, res, next) => {
    const articleId = req.params.article_id;
    fetchArticleId(articleId).then((response) => {
        res.status(200).send({article: response.rows[0]});
    })
    .catch((err) => {
        next(err);
    })
}
exports.getEndpoints = (req, res, next) => {
    res.status(200).send({endpoints});
}
exports.getArticles = (req, res, next) => {
    fetchArticles().then(({rows}) => {
        res.status(200).send(rows);
    })
}

exports.getComments = (req, res, next) => {
    const article_id = req.params.article_id;
    fetchComments(article_id).then(({rows}) => {
        res.status(200).send(rows);
    })
    .catch(err => {
        next(err);
    })
}


