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
    password(id: Int!): Password
  }

  type Mutation {
    createPassword(password: CreatePasswordInput!): Password!
  }
`

const resolvers = {
  Query: {
    async allPasswords() {
      return Password.all()
        .then((passwords) => passwords.toJSON())
    },

    async password(_, { id }) {
      return Password.find(id)
        .then((password) => password.toJSON())
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
