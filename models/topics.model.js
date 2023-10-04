const db = require('../db/connection.js');
const format = require('pg-format');

exports.fetchTopics = (path) => {

    return db.query(`
    SELECT * FROM topics;
    `);
}

exports.fetchArticleId = (articleId) => {

    const query = `
    SELECT * FROM articles
    WHERE articles.article_id = $1;
    `
    return db.query(query, [articleId])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: "Article ID not found"})
        }
        return result;
    })
}

exports.insertComment = (commentBody, article_id) => {
    const { username, body } = commentBody;
    const newArticle_id = parseInt(article_id);

    const query = `
    INSERT INTO comments
    (body, author, article_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
    ;
    `
    return db.query(query, [body, username, newArticle_id])
    .then(({rows}) => {
        return rows[0];
    })
}