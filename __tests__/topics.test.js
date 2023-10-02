const request = require('supertest');
const app = require("../app.js");
const db = require('../db/connection.js');
const data = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const endpoints = require('../endpoints.json');

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	db.end();
});

describe.only('GET /api', () => {
    it('GET:404 should check error is returned when given invalid path', () => {
		return request(app)
			.get('/api/HELLO')
			.expect(404)
			.then(({body}) => {
				expect(body.msg).toBe('Path not found');
			});
    });
    it('GET:200 should return status code 200 when path is valid', () => {
        return request(app).get('/api/topics').expect(200);
    });
    it('should provide description of all endpoints available', () => {
        return request(app).get('/api').then(({body}) => {
            expect(body.endpoints).toMatchObject(endpoints);
        });
    });


});

describe('GET /api/topics', () => {
    it('GET:200 should return status code 200', () => {
        return request(app).get('/api/topics').expect(200);
    });
    it('GET:200 should provide all topics from table in correct format', () => {
        return request(app).get('/api/topics').then(({body}) =>{
            const topics = body.topics;
            expect(topics).toHaveLength(3);
            topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            });
        })
    });
    
});