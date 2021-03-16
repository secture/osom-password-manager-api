'use strict'

/** @type import('../../Models/Password') */
const Password = use('App/Models/Password')

class PasswordController {
  list() {
    return Password.all()
  }

  detail({ params: { id } }) {
    return Password.find(id)
  }
}

module.exports = PasswordController
