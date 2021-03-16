'use strict'

const Password = use('App/Models/Password')

class PasswordController {
  list() {
    return Password.all()
  }
}

module.exports = PasswordController
