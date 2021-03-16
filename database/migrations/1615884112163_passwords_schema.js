'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordsSchema extends Schema {
  up () {
    this.create('passwords', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('username', 255).notNullable()
      table.string('password', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('passwords')
  }
}

module.exports = PasswordsSchema
