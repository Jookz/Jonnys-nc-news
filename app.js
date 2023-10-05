const express = require('express')
const { handle500Errors, handleCustomErrors, handlePsqlErrors} = require('./controllers/errors.controller.js');
const { getTopics, getEndpoints, getArticleId, getArticles, postComment, patchArticle, deleteComment } = require('./controllers/topics.controller.js');

const app = express();

app.use(express.json());

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleId)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)

app.all('/*',(req, res)=>{
    res.status(404).send({msg: "Path not found"})
});


app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500Errors);


module.exports = app;