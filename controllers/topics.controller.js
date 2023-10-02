const { fetchTopics } = require('../models/topics.model.js');
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

exports.getEndpoints = (req, res, next) => {
    res.status(200).send({endpoints});
}

