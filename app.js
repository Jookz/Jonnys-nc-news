const express = require('express')
const { getTopics } = require('./controllers/topics.controller.js');

const app = express();

app.get('/api/topics', getTopics);




app.use((err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
});

app.use((err, req, res, next) => {
	res.status(400).send({ msg: 'Bad request' });
});

module.exports = app;