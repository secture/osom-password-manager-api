'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Password', (faker, i, data = {}) => {
  return {
    name: faker.sentence({ words: 3 }),
    username: faker.username(),
    password: faker.string(),
    ...data,
  }
})
