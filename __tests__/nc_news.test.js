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

describe('GET /api', () => {
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

describe('GET /api/articles', () => {
    it('GET:200 should return status code 200', () => {
        return request(app).get('/api/articles').expect(200);
    });
    it('GET:200 should respond with an array of article objects, each with the correct format', () => {
        return request(app).get('/api/articles').then(({body}) => {
            expect(body).toHaveLength(13);
            body.forEach(article => {

                expect(article).toHaveProperty("article_id");
                expect(article).toHaveProperty("title");
                expect(article).toHaveProperty("topic");
                expect(article).toHaveProperty("author");
                expect(article).toHaveProperty("created_at");
                expect(article).toHaveProperty("votes");
                expect(article).toHaveProperty("article_img_url");
                expect(article).toHaveProperty("comment_count");
            })

        })
    });
    it('GET:200 should order articles by date in descending order', () => {
        return request(app).get('/api/articles').then(({body}) => {
            expect(body).toHaveLength(13);
            expect(body).toBeSortedBy("created_at", {descending: true});
        })
    });
    it('GET:404 should return error if given invalid path', () => {
        return request(app)
			.get('/api/words-instead-of-articles')
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe('Path not found');
			});
    });
});

describe('GET /api/articles/:article_id', () => {
    it('GET:200 should return status code 200', () => {
        return request(app).get('/api/articles/1').expect(200);
    });
    it('GET:200 should provide the article by its ID', () => {
        return request(app).get('/api/articles/1').then(({body}) => {
            const testArticle = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 100,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              } 
            expect(body.article).toMatchObject(testArticle);
        })
    });
    it('GET:404 should return error if article ID does not exist', () => {
        return request(app)
			.get('/api/articles/9999')
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe('Article ID not found');
			});
    });
    it('GET:400 should return error if given invalid article ID', () => {
        return request(app)
			.get('/api/articles/hamsandwich')
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe('Bad request');
			});
    });
});


describe('POST, /api/articles/:article_id/comments', () => {
    it('POST:201 should return correct status code', () => {
        return request(app).post('/api/articles/1/comments')
        .send({
            username: "icellusedkars",
            body: "Enjoyed it"
        })
        .expect(201);
    });
    it('POST:201 should post new comment and return comment with confirmation', () => {
        return request(app).post('/api/articles/1/comments')
        .send({
            username: "icellusedkars",
            body: "Enjoyed it"
        })
        .then(({body}) => {
            expect(body.comment).toHaveProperty("comment_id");
            expect(body.comment).toHaveProperty("body");
            expect(body.comment).toHaveProperty("article_id");
            expect(body.comment).toHaveProperty("author");
            expect(body.comment).toHaveProperty("votes");
            expect(body.comment).toHaveProperty("created_at");

        })
    });
    it('POST:400 should give error when passed object with incorrect format', () => {
        return request(app).post('/api/articles/1/comments')
        .send({
            name: "icellusedkars",
            body: "Enjoyed it"
        })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request");
        })
    });
    it('POST:201 should ignore unecessary additional properties', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({
            username: "icellusedkars",
            body: "Enjoyed it",
            extra: "Extra thing",
            extra2: "another one"
        })
        .expect(201)
        .then(({body}) => {
            expect(body.comment).toHaveProperty("comment_id");
            expect(body.comment).toHaveProperty("body");
            expect(body.comment).toHaveProperty("article_id");
            expect(body.comment).toHaveProperty("author");
            expect(body.comment).toHaveProperty("votes");
            expect(body.comment).toHaveProperty("created_at");

        })
    });
    it('POST:404 should return error if article ID does not exist', () => {
        return request(app)
			.post('/api/articles/9999/comments')
            .send({
                username: "icellusedkars",
                body: "Enjoyed it"
            })
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe('Article ID not found');
			});
    });
    it('POST:400 should return error if given invalid article ID', () => {
        return request(app)
			.post('/api/articles/hamsandwich/comments')
            .send({
                username: "icellusedkars",
                body: "Enjoyed it"
            })
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe('Bad request');
			});
    });
});