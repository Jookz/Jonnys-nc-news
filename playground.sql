\c nc_news

-- SELECT articles.article_id, title, topic, articles.author, articles.created_at, article_img_url, CAST(COUNT(comments.article_id) AS INT) AS comment_count, SUM(comments.votes) AS votes
--     FROM articles
--     LEFT JOIN comments 
--     ON articles.article_id = comments.article_id
--     GROUP BY articles.article_id, comments.article_id
--     ORDER BY articles.created_at DESC;
    
-- SELECT comments.body, comments.votes, comments.author, comments.article_id, comments.created_at, articles.article_id 
-- FROM comments
-- LEFT JOIN articles ON articles.author = comments.author
-- WHERE articles.article_id = 2
-- ORDER BY created_at DESC;

-- SELECT * FROM comments
-- ORDER BY article_id DESC
-- ;

SELECT comments.body, comments.votes, comments.author, comments.article_id, comments.created_at
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
WHERE articles.article_id = 37;

-- SELECT * FROM comments
--     WHERE article_id = $1
--     ORDER BY created_at DESC;