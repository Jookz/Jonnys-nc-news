const { fetchTopics, fetchArticleId } = require('../models/topics.model.js');

exports.getTopics = (req, res, next) => {
    const path = req.route.path;
    fetchTopics(path).then((result) => {
        res.status(200).send({topics: result.rows});
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