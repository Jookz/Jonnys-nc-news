const { response } = require("../app.js");
const db = require("../db/connection.js");
const format = require("pg-format");

exports.fetchTopics = (topic) => {
  const array = [];
  let query = `
    SELECT * FROM topics 
    `;
  if (topic) {
    query += `
        WHERE slug = $1
        `;
    array.push(topic);
  }
  query += `;`;
  return db.query(query, array).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Topic not found" });
    }
    return result;
  });
};
exports.fetchArticleId = (articleId) => {
  const query = `
    SELECT articles.article_id, articles.body, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url, CAST(COUNT(comments.article_id) AS INT) AS comment_count, articles.votes
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id, comments.article_id
    ORDER BY articles.created_at DESC;
    `;
  return db.query(query, [articleId]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Article ID not found" });
    }
    return result;
  });
};

exports.fetchComments = (article_id) => {
  const query = `
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `;
  return db.query(query, [article_id]);
};

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
    `;
  return db.query(query, [body, username, newArticle_id]).then(({ rows }) => {
    if (rows[0].body.length === 0) {
      return Promise.reject({
        status: 400,
        msg: "Empty body - comment could not be added",
      });
    }
    return rows[0];
  });
};

exports.fetchArticles = (topic, sort_by, order) => {
  sort_by = sort_by || "created_at";
  order = order || "desc";

  if (
    ![
      "author",
      "title",
      "topic",
      "body",
      "votes",
      "created_at",
      "comment_count",
      "article_img_url",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }
  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  const array = [];

  let query = `
  SELECT articles.article_id, articles.body, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url, articles.votes, CAST(COUNT(comments.article_id) AS INT) AS comment_count
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    `;

  if (topic) {
    query += `
        WHERE topic = $1
        `;
    array.push(topic);
  }

  query += `
  GROUP BY articles.article_id, articles.body, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url, articles.votes
    ORDER BY ${sort_by} ${order};`;

  return db.query(query, array);
};

exports.editArticle = ({ inc_votes }, article_id) => {
  const query = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *
    `;
  return db.query(query, [inc_votes, article_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Entry not found" });
    }
    return result;
  });
};

exports.removeComment = (comment_id) => {
  const query = `
    DELETE from comments
    WHERE comment_id = $1;
    `;
  return db.query(query, [comment_id]).then((result) => {
    if (result.rowCount === 0) {
      return Promise.reject({
        status: 404,
        msg: "Comment does not exist",
      });
    }
    return result;
  });
};

exports.fetchUsers = () => {
  const query = `
    SELECT * FROM users
    `;
  return db.query(query);
};

exports.fetchSingleUser = (username) => {
  const query = `
    SELECT * FROM users
    WHERE username = $1;
    `;
  return db.query(query, [username]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Username not found" });
    }
    return result;
  });
};
