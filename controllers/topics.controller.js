const { fetchTopics } = require('../models/topics.model.js');

exports.getTopics = (req, res, next) => {
    const path = req.route.path;
    fetchTopics(path).then((result) => {
        res.status(200).send({topics: result.rows});
    })
    .catch((err) => {
        next(err);
    })
}