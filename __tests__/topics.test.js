const request = require('supertest');
const app = require("../app.js");
const db = require('../db/connection.js');
const data = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	db.end();
});


describe('GET /api/topics', () => {
    it('should return status code 200', () => {
        return request(app).get('/api/topics').expect(200);
    });
    it('should provide all topics from table in correct format', () => {
        return request(app).get('/api/topics').expect(200).then(({body}) =>{
            const topics = body.topics;
            topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            });
        })
    });
});