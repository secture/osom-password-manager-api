'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const GraphqlAdonis = use('ApolloServer')
const schema = require('../app/Schema')

Route.get('/passwords', 'PasswordController.list')
Route.post('/passwords', 'PasswordController.create')
Route.get('/passwords/:id', 'PasswordController.detail')
Route.delete('/passwords/:id', 'PasswordController.delete')
Route.put('/passwords/:id', 'PasswordController.edit')

Route.route('/gql', ({ request, auth, response }) => {
  return GraphqlAdonis.graphql({
    schema,
    context: { auth }
  }, request, response)
}, ['GET', 'POST'])

Route.route('/graphiql', ({ request, response }) => {
  return GraphqlAdonis.graphiql({ endpoint: '/gql'}, request, response)
})
