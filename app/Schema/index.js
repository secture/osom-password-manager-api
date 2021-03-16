'use strict'

const { makeExecutableSchema } = require('graphql-tools')
/** @type {import('../../app/Models/Password')} */
const Password = use('App/Models/Password')

const typeDefs = `
  type Password {
    id: Int!
    name: String!
    username: String!
    password: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    allPasswords: [Password]
  }
`

const resolvers = {
  Query: {
    async allPasswords() {
      const passwords = await Password.all()
      return passwords.toJSON()
    }
  }
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
