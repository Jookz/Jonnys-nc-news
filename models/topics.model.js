const db = require('../db/connection.js');
const format = require('pg-format');

exports.fetchTopics = (path) => {

    return db.query(`
    SELECT * FROM topics;
    `);
};
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
    });
}

// const checkExists = async (table, column, value) => {
//     // %I is an identifier in pg-format
//     const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
//     const dbOutput = await db.query(queryStr, [value]);
  
//     if (dbOutput.rows.length === 0) {
//       // resource does NOT exist
//       return Promise.reject({ status: 404, msg: 'Resource not found' });
//     }
//   };
//   if (1 === 1) {
//       console.log(checkExists('article', 'article_id', articleID));

//   };
exports.fetchComments = (article_id) => {
    const query = `
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `
    return db.query(query, [article_id])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: "Article ID not found"})
        }
        return result;
    });
}

exports.fetchArticles = () => {
    const query = `
    SELECT articles.article_id, title, topic, articles.author, articles.created_at, article_img_url, CAST(COUNT(comments.article_id) AS INT) AS comment_count, SUM(comments.votes) AS votes
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id, comments.article_id
    ORDER BY articles.created_at DESC;
    `
    return db.query(query);
};
