'use strict'

const { test, trait } = use('Test/Suite')('PasswordController')
/** @type { typeof import('@adonisjs/lucid/src/Lucid/Model')} */
/** @type {import('@adonisjs/lucid/src/Factory')} */
/** @type {import('../../app/Models/Password')} */
const Factory = use('Factory')
const Password = use('App/Models/Password')

trait('Test/ApiClient')

test('it returns list of passwords', async ({ client }) => {
  let product = await Factory.model('App/Models/Password').create();

  const response = await client.get('/passwords').end()

  response.assertStatus(200);
  response.assertJSONSubset([product.toJSON()])
})

test('it returns password detail', async ({ client }) => {
  let password = await Factory.model('App/Models/Password').create({ id: 15 });

  const response = await client.get('/passwords/15').end()

  response.assertStatus(200);
  response.assertJSON(password.toJSON())
})

test('it creates new password', async ({ client, assert }) => {
  let password = await Factory.model('App/Models/Password').make();
  password = password.toJSON()

  const response = await client.post('/passwords').send(password).end()

  response.assertStatus(201);
  assert.isDefined(response.body.id)
  assert.equal(response.body.name, password.name)
  assert.equal(response.body.username, password.username)
  assert.equal(response.body.password, password.password)
})

test('it deletes existing password', async ({ client, assert }) => {
  let password = await Factory.model('App/Models/Password').create();

  const response = await client.delete(`/passwords/${password.id}`).end()

  response.assertStatus(204);

  const result = await Password.find(password.id)
  assert.isNull(result)
})
