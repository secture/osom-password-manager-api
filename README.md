# Awesome Password Manager API

This project is our super-secure API for our passwords management system.

_Don't take this 👆 so seriously_ 

## Setup

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Copy the `.env.example` to `.env` and fill the `APP_KEY` value. If you want to customize another value feel free.
4. Create the database (default to SQLite) with `node ace migration:run`
5. Start the server: `npm run start` 🎉

## API

You have two flavors to work with the API:

* **REST:** you can find Swagger documentation in `http://localhost:3333/docs` (or in the port you configured)
* **GraphQL:** you can find [GraphiQL](https://github.com/graphql/graphiql) in `http://localhost:3333/graphiql` to play with GraphQL.
