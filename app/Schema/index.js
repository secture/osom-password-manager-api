'use strict'

const { makeExecutableSchema } = require('graphql-tools')
/** @type {import('../../app/Models/Password')} */
const Password = use('App/Models/Password')
const { Void } = require('./scalars')

const typeDefs = `
  scalar Void

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

  input UpdatePasswordInput {
    name: String
    username: String
    password: String
  }

  type Query {
    allPasswords: [Password]
    password(id: Int!): Password
  }

  type Mutation {
    createPassword(password: CreatePasswordInput!): Password!
    updatePassword(id: Int!, passwordInput: UpdatePasswordInput!): Password!
    deletePassword(id: Int!): Void
  }
`

const resolvers = {
  Void,

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
    },

    async deletePassword(_, { id }) {
      return Password.find(id)
        .then((password) => password.delete())
        .then(() => null)
    },

    async updatePassword(_, { id, passwordInput }) {
      return Password.find(id)
        .then((password) => {
          password.merge(passwordInput)
          return password.save()
            .then(() => password.toJSON())
        });
    }
  }
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
