\c nc_news

-- INSERT INTO comments
-- (body, votes, author, article_id, created_at)
-- VALUES
-- ("body", 0, "author text", 99, 2022-09-20)
-- RETURNING * ;

SELECT * FROM comments;

-- SELECT comments.article_id, COUNT(*) AS comment_count, SUM(comments.votes) AS votes, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url
-- FROM comments
-- JOIN articles
-- ON articles.article_id = comments.article_id
-- GROUP BY comments.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url
-- ORDER BY comments.article_id ASC;
