const { response } = require('../app.js');
const db = require('../db/connection.js');
const format = require('pg-format');

exports.fetchTopics = (path) => {

    return db.query(`
    SELECT * FROM topics;
    `);
};
exports.fetchArticleId = (articleId) => {

    const query = `
    SELECT articles.article_id, title, topic, articles.author, articles.created_at, article_img_url, CAST(COUNT(comments.article_id) AS INT) AS comment_count, articles.votes
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id, comments.article_id
    ORDER BY articles.created_at DESC;
    `
    return db.query(query, [articleId])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: "Article ID not found"})
        }
        return result;
    });
}

exports.fetchComments = (article_id) => {
    const query = `
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `
    return db.query(query, [article_id]);
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
        if(rows[0].body.length === 0) {
            return Promise.reject({ status: 400, msg: "Empty body - comment could not be added"})
        }
        return rows[0];
    })
};

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

exports.editArticle = ({inc_votes}, article_id) => {
    const query = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *
    `
    return db.query(query, [inc_votes, article_id])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({ status: 404, msg: "Entry not found" })
        }
        return result;
    })
}

exports.removeComment = (comment_id) => {
    const query = `
    DELETE from comments
    WHERE comment_id = $1;
    `
    return db.query(query, [comment_id])
    .then((result) => {
		if (result.rowCount === 0) {
			return Promise.reject({
				status: 404,
				msg: 'Comment does not exist',
			});
		}
		return result;
	});
};

exports.fetchUsers = () => {

}
