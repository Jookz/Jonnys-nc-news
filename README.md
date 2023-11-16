# Northcoders News API


Hosted version can be found at : https://nc-news-6m81.onrender.com/

## Introduction

This API has been built for the purpose of accessing application data programmatically. The intention is to mimic a real world backend service (such as Reddit) which should provide this information to the front end architecture.

## Get Started

Fork this repository using the "fork" button towards the top-right of the page.
To clone this repo, navigate to your desired file on your system and use the command:

`git clone https://github.com/Jookz/Jonnys-nc-news`

Following this, install necessary dependencies and dev dependencies using the command:

`npm i`

To create and seed the local databases, use the commands:

`npm run setup-dbs
npm run seed`

To access the two databases locally, please create .env.development and .env.test files. Each of these files should contain PGDATABASE=nc_news and PGDATABASE=nc_news_test respectively.

## Testing

The test files can be run using the command:

`npm t`

## Requirements

Minimum Node and Postgres requirements to run are:

Node v20.5.1,
Postgres 14.9
