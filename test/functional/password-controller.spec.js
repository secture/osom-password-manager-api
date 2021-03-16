'use strict'

const { test, trait } = use('Test/Suite')('PasswordController')
/** @type { typeof import('@adonisjs/lucid/src/Lucid/Model')} */
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('it returns list of passwords', async ({ client }) => {
  let product = await Factory.model('App/Models/Password').create();

  const response = await client.get('/passwords').end()

  response.assertStatus(200);
  response.assertJSONSubset([product.toJSON()])
})
