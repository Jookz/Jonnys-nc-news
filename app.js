const express = require('express')
const { getTopics, getArticleId } = require('./controllers/topics.controller.js');
const { handle500Errors, handleCustomErrors, handlePsqlErrors} = require('./controllers/errors.controller.js');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleId)


app.all('/*',(req, res)=>{
    res.status(404).send({msg: "Path not found"})
});


app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500Errors);


module.exports = app;