# Northcoders News API


<!-- A link to the hosted version.
A summary of what the project is.
Clear instructions of how to clone, install dependencies, seed local database, and run tests.
Information about how to create the two .env files.
The minimum versions of Node.js, and Postgres needed to run the project. -->

Hosted version of this server can be found at : postgres://tjovswmd:nQAkuNN_-pcQKPTDQTJTmjEGCijFY0zN@tai.db.elephantsql.com/tjovswmd 

To clone this repo, navigate to your desired file and use the command:

git clone https://github.com/Jookz/Jonnys-nc-news

Following this, install necessary dependencies using the commind:

npm i

To create and seed the local databases, use the commands:

npm run setup-dbs
npm run seed

The test files can be run using:

npm t

To access the two databases locally, please create .env.development and .env.test files. Each of these files should contain PGDATABASE=nc_news and PGDATABASE=nc_news_test respectively.

Minimum Node and Postgres requirements to run are:

Node
Postgres 14.9