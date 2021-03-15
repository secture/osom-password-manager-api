'use strict'

const { test, trait } = use('Test/Suite')('Password')

trait('Test/ApiClient')

test('get list of passwords', async ({ client }) => {
  const response = await client.get('/passwords').end()

  response.assertStatus(200);
})
