const express = require('express')
const { getTopics } = require('./controllers/topics.controller.js');

const app = express();

app.get('/api/topics', getTopics);


app.all('/*',(req, res)=>{
    res.status(404).send({msg: "Path not found"})
});


app.use((err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
});


module.exports = app;