const express = require("express");
const cors = require("cors");
const {
  handle500Errors,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./controllers/errors.controller.js");
const {
  getTopics,
  getEndpoints,
  getArticleId,
  getArticles,
  getComments,
  postComment,
  patchArticle,
  deleteComment,
  getUsers,
  getSingleUser,
  postUsername,
} = require("./controllers/nc_news.controller.js");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleId);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.get("/api/users/:username", getSingleUser);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500Errors);

module.exports = app;
