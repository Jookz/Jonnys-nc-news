\c nc_news

SELECT articles.article_id, title, topic, articles.author, articles.created_at, article_img_url, CAST(COUNT(comments.article_id) AS INT) AS comment_count, SUM(comments.votes) AS votes
        FROM articles
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id, comments.article_id
            ORDER BY author DESC