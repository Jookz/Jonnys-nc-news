const { fetchComments, fetchUsers, fetchTopics, fetchArticles, fetchArticleId, insertComment, editArticle, removeComment } = require('../models/topics.model.js');
const endpoints = require('../endpoints.json');
const { error } = require('console');

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
    const promises = [fetchComments(article_id), fetchArticleId(article_id)];

    Promise.all(promises)
    .then((response) => {
        res.status(200).send(response[0].rows);
    })
    .catch(err => {
        next(err);
    });
}

exports.postComment = (req, res, next) => {
    const article_id = req.params.article_id;
    insertComment(req.body, article_id).then((comment) => {
        res.status(201).send({comment});
    })
    .catch(err => {
        next(err)
    })
}

exports.patchArticle = (req, res, next) => {
    const article_id = req.params.article_id;
    editArticle(req.body, article_id).then((response) => {
        res.status(201).send({updated_article: response.rows[0]});
    })
    .catch((err) => {
        next(err);
    })
}

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params;
    removeComment(comment_id).then(() => {
        res.status(204).send();
    })
    .catch(err => {
        next(err);
    })
};

exports.getUsers = (req, res, next) => {
    //fetchUsers()
    res.status(200).send();
}


