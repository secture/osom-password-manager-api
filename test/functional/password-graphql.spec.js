'use strict'

const { test, trait } = use('Test/Suite')('Password GraphQL')
/** @type {import('../../app/Models/Password')} */
const Factory = use('Factory')

trait('Test/ApiClient')

async function makeGraphQLCall(client, query) {
  return await client.post('/gql')
    .send({query: query})
    .end();
}

test('it returns list of passwords', async ({ client, assert }) => {
  let product = await Factory.model('App/Models/Password').create();

  let query = `
  query {
    allPasswords {
      id
      name
      username
      password
      created_at
      updated_at
    }
  }
`;

  const response = await makeGraphQLCall(client, query)

  response.assertStatus(200);

  const body = JSON.parse(response.text)

  assert.isDefined(body.data)
  assert.deepInclude(body.data.allPasswords, product.toJSON())
})
