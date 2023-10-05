\c nc_news

SELECT articles.article_id, title, topic, articles.author, articles.created_at, article_img_url, CAST(COUNT(comments.article_id) AS INT) AS comment_count, articles.votes
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = 1
    GROUP BY articles.article_id, comments.article_id
    ORDER BY articles.created_at DESC;