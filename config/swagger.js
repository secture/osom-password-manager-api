'use strict'

module.exports = {
  enable: true,
  specUrl: '/swagger.json',

  options: {
    swaggerDefinition: {
      info: {
        title: 'Osom Password Manager API',
        version: '0.0.1',
      },

      basePath: '/',
    },

    apis: [
      'docs/**/*.yaml'
    ]
  }
}
