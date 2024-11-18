const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
          title: 'GT-PodcastParty',
          version: '1.0.0',
          description: 'Rutas de la API de GT-PodcastParty para poder escuchar el podcast de Web Reactiva.',
        },
      },
  apis: ['./documentation/swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerUi = require('swagger-ui-express');

module.exports = {
  swaggerDocs,
  swaggerUi
}