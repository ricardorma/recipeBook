const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica para Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Recetas',
    version: '1.0.0',
    description: 'Documentación de la API de Recetas utilizando Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000/api-docs',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Rutas de los archivos donde están definidos los endpoints
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
