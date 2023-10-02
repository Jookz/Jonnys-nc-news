const db = require('../db/connection.js');
const format = require('pg-format');

exports.fetchTopics = (path) => {
    if (path !== '/api/topics') {
		return Promise.reject({ status: 404, msg: 'Path not found' });
	}

    return db.query(`
    SELECT * FROM topics;
    `);
}