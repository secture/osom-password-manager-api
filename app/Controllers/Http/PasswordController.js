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

  async create({ request, response }) {
    const passwordData = request.only(['name', 'username', 'password'])

    response.status(201).json(await Password.create(passwordData))
  }
}

module.exports = PasswordController
