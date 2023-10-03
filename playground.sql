\c nc_news

SELECT articles.article_id, title, topic, articles.author, articles.created_at, article_img_url, COUNT(comments.article_id) AS comment_count, SUM(comments.votes) AS votes
FROM articles
LEFT JOIN comments 
ON articles.article_id = comments.article_id
GROUP BY articles.article_id, comments.article_id
ORDER BY articles.article_id DESC;

-- SELECT comments.article_id, COUNT(*) AS comment_count, SUM(comments.votes) AS votes, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url
-- FROM comments
-- JOIN articles
-- ON articles.article_id = comments.article_id
-- GROUP BY comments.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url
-- ORDER BY comments.article_id ASC;