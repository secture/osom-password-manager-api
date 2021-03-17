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

  input CreatePasswordInput {
    name: String!
    username: String!
    password: String!
  }

  type Query {
    allPasswords: [Password]
  }

  type Mutation {
    createPassword(password: CreatePasswordInput!): Password!
  }
`

const resolvers = {
  Query: {
    async allPasswords() {
      const passwords = await Password.all()
      return passwords.toJSON()
    }
  },

  Mutation: {
    async createPassword(_, { password }) {
      return Password.create(password)
        .then((createdPassword) => createdPassword.toJSON());
    }
  }
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
