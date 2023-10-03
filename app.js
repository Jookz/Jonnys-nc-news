const express = require('express')
const { handle500Errors, handleCustomErrors, handlePsqlErrors} = require('./controllers/errors.controller.js');
const { getTopics, getEndpoints, getArticleId, getArticles, getComments } = require('./controllers/topics.controller.js');

const app = express();

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleId)

app.get('/api/articles/:article_id/comments', getComments)

app.all('/*',(req, res)=>{
    res.status(404).send({msg: "Path not found"})
});


app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500Errors);


module.exports = app;