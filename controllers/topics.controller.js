const { fetchTopics, fetchArticleId } = require('../models/topics.model.js');
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


