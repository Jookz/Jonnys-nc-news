# Northcoders News API


Hosted version can be found at : https://nc-news-6m81.onrender.com/

To clone this repo, navigate to your desired file and use the command:

git clone https://github.com/Jookz/Jonnys-nc-news

Following this, install necessary dependencies using the command:

npm i

To create and seed the local databases, use the commands:

npm run setup-dbs
npm run seed

The test files can be run using:

npm t

To access the two databases locally, please create .env.development and .env.test files. Each of these files should contain PGDATABASE=nc_news and PGDATABASE=nc_news_test respectively.

Minimum Node and Postgres requirements to run are:

Node v20.5.1
Postgres 14.9