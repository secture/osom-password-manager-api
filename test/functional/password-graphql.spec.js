'use strict'

const { test, trait } = use('Test/Suite')('Password GraphQL')
/** @type {import('../../app/Models/Password')} */
const Factory = use('Factory')
const Password = use('App/Models/Password')

trait('Test/ApiClient')

async function makeGraphQLCall(client, query, variables) {
  function isError(response) {
    return !(200 <= response.status && response.status <= 299);
  }

  let graphQLRequest = { query: query };
  if (undefined !== variables) {
    graphQLRequest.variables = variables;
  }

  const response = await client.post('/gql')
    .send(graphQLRequest)
    .end();

  return {
    response,
    body: !isError(response) ? JSON.parse(response.text) : response.text
  }
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

  const { response, body } = await makeGraphQLCall(client, query)

  response.assertStatus(200);

  assert.isDefined(body.data)
  assert.deepInclude(body.data.allPasswords, product.toJSON())
})

test('it returns password detail', async ({ client, assert }) => {
  let password = await Factory.model('App/Models/Password').create({ id: 10 });

  let query = `
  query GetPassword($id: Int!) {
    password(id: $id) {
      id
      name
      username
      password
      created_at
      updated_at
    }
  }
`

  const { response, body: { data: { password: returnedPassword} } } = await makeGraphQLCall(
    client,
    query,
    { id: 10 }
  )


  response.assertStatus(200);
  assert.deepEqual(returnedPassword, password.toJSON())
})

test('it creates new password', async ({ client, assert }) => {
  let password = await Factory.model('App/Models/Password').make();
  password = password.toJSON()

  let query = `
  mutation CreatePassword($newPassword: CreatePasswordInput!) {
    createPassword(password: $newPassword) {
      id
      name
      username
      password
    }
  }
`;

  const { response, body: { data: { createPassword: newPassword} } } = await makeGraphQLCall(client, query, {
    newPassword: password
  })


  response.assertStatus(200);
  assert.isDefined(newPassword.id)
  assert.equal(newPassword.name, password.name)
  assert.equal(newPassword.username, password.username)
  assert.equal(newPassword.password, password.password)
})

test('it deletes existing password', async ({ client, assert }) => {
  let password = await Factory.model('App/Models/Password').create();

  let query = `
  mutation DeletePassword($id: Int!) {
    deletePassword(id: $id)
  }
`;

  const { response, body: { data } } = await makeGraphQLCall(client, query, {
    id: password.id
  })
  response.assertStatus(200);

  const result = await Password.find(password.id)
  assert.isNull(data.deletePassword)
  assert.isNull(result)
})

test('it allows to edit existing password', async ({ client, assert }) => {
  let password = await Factory.model('App/Models/Password').create();
  const newData = { name: 'New name', password: 'New password', username: 'New username' }

  let query = `
  mutation UpdatePassword($id: Int!, $input: UpdatePasswordInput!) {
    updatePassword(id: $id, passwordInput: $input) {
      id
      name
      username
      password
    }
  }
`;

  const { response, body: { data: { updatePassword: updatedPassword } } } = await makeGraphQLCall(client, query, {
    id: password.id,
    input: newData
  })

  response.assertStatus(200);
  assert.equal(updatedPassword.name, newData.name)
  assert.equal(updatedPassword.username, newData.username)
  assert.equal(updatedPassword.password, newData.password)

  const storedPassword = await Password.find(password.id)
  assert.equal(storedPassword.name, newData.name)
  assert.equal(storedPassword.username, newData.username)
  assert.equal(storedPassword.password, newData.password)
})
