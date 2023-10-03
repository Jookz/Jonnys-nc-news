const express = require('express')
const { getTopics, getEndpoints, getArticleId, getArticles } = require('./controllers/topics.controller.js');

const app = express();

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleId)


app.all('/*',(req, res)=>{
    res.status(404).send({msg: "Path not found"})
});



module.exports = app;