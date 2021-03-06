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

  async delete({ params: { id } }) {
    await Password.find(id)
      .then((password) => password.delete())

    return null
  }

  async edit({ params: { id }, request }) {
    const passwordData = request.only(['name', 'username', 'password'])
    const password = await Password.find(id)
    password.merge(passwordData)

    await password.save()

    return password
  }
}

module.exports = PasswordController
