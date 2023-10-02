const db = require('../db/connection.js');
const format = require('pg-format');

exports.fetchTopics = (path) => {

    return db.query(`
    SELECT * FROM topics;
    `);
}